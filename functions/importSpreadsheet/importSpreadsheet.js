const { google } = require('googleapis')
const functions = require('firebase-functions');

const { stateCodes } = require('../utilities/states')
const { requiredFields } = require('./requiredFields')
const admin = require('firebase-admin')
const FieldValue = admin.firestore.FieldValue
const timestamp = admin.firestore.Timestamp.fromDate(new Date())

// const { inspect } = require('util')

module.exports.importSpreadsheet = async (db, dataImport, dataImportStep) => {
  const url =
    dataImportStep.legislatorType === 'federal'
      ? dataImport.federalMembersUrl
      : dataImport.stateMembersUrl
  const spreadsheetId = url.split('/')[5]

  const sheets = google.sheets({ version: 'v4', auth: functions.config().browser.apikey })

  const logMessage = async message => {
    await db.collection('dataImports').doc(dataImport.id).collection('importLog').doc().set({
      legislatorType: dataImportStep.legislatorType,
      message,
      timestamp: FieldValue.serverTimestamp(),
    })
  }

  // Get column headers
  let columnHeaders, headerResults
  const firstRowRange = { spreadsheetId: spreadsheetId, range: 'A1:CN1' }
  try {
    headerResults = await sheets.spreadsheets.values.get(firstRowRange)
  } catch (error) {
    return logMessage('The API returned an error getting header: ' + error)
  }

  // reducing column headers
  columnHeaders = headerResults.data.values[0].reduce((obj, value, index) => {
    obj[value] = index
    return obj
  }, {})
  // await logMessage(`Got columnHeaders: ${inspect(columnHeaders)}`)

  // get all the data
  let dataResults
  const startRow = dataImportStep.row
  const endRow = dataImportStep.row + 100

  const dataRange = { spreadsheetId: spreadsheetId, range: `A${startRow}:CN${endRow}` }
  try {
    dataResults = await sheets.spreadsheets.values.get(dataRange)
  } catch (error) {
    return console.log('The API returned an error getting data: ' + error)
  }

  if (dataResults.data.values.length < 1) {
    return null
  }

  const results = []

  const setLeader = async (doc, leader) => {
    await doc.set(leader)
    return logMessage(leader.permaLink)
  }

  for (const row of dataResults.data.values) {
    const leader = { lastImportDate: timestamp }
    for (const field of requiredFields) {
      let index = columnHeaders[field]
      let value = row[index]
      if (value) value = value.trim()
      if (value) leader[field] = value
    }

    if (leader.LastName !== 'Vacant' && stateCodes.includes(leader.StateCode)) {
      if (leader.PhotoPath) {
        leader.hasPhoto = true
        leader.PhotoPath = leader.PhotoPath.replace(/\\/g, '/')
      } else {
        leader.hasPhoto = false
      }

      leader.permaLink = `${leader.LastName}-${leader.FirstName}-${leader.PID}`
        .replace(/[^a-z0-9_-]+/gi, '')
        .toLowerCase()

      const currentDoc = db
        .collection('states')
        .doc(leader.StateCode)
        .collection('leaders')
        .doc(leader.permaLink)

      const rootDoc = db.collection('leaders').doc(leader.permaLink)
      try {
        results.push(setLeader(currentDoc, leader))
        results.push(setLeader(rootDoc, leader))
      } catch (error) {
        console.log('Error setting leader: ', leader.permaLink, error)
      }
    }
  }
  await Promise.all(results)

  return db
    .collection('dataImports')
    .doc(dataImport.id)
    .collection('importStep')
    .doc()
    .set({
      legislatorType: dataImportStep.legislatorType,
      row: endRow + 1,
      timestamp: FieldValue.serverTimestamp(),
    })
}

// module.exports.addStateNameAndRegion = async db => {
//   const writes = stateCodes.map(stateCode => {
//     return db
//       .collection('states')
//       .doc(stateCode)
//       .set({
//         name: statesObj[stateCode],
//         region: regionForStateCode(stateCode),
//       })
//   })
//   return Promise.all(writes)
// }
