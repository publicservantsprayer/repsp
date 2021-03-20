const { google } = require('googleapis')
const functions = require('firebase-functions')
const moment = require('moment-timezone')
const timezone = 'America/New_York'

const { stateCodes } = require('../utilities/states')
const { requiredFields } = require('./requiredFields')
const admin = require('firebase-admin')
const { FieldValue } = admin.firestore
const auth = functions.config().browser.apikey

module.exports.importSpreadsheet = async (db, dataImport, stepConfig) => {
  const lastImportDate = dataImport.date
  const { legislatorType, row: stepConfigRow, maxRowCount } = stepConfig

  const logMessage = async message => {
    await db.collection('dataImports').doc(dataImport.id).collection('importLog').doc().set({
      legislatorType: stepConfig.legislatorType,
      message,
      timestamp: FieldValue.serverTimestamp(),
    })
  }

  const url =
    legislatorType === 'federal' ? dataImport.federalMembersUrl : dataImport.stateMembersUrl
  const spreadsheetId = url.split('/')[5]

  const sheets = google.sheets({ version: 'v4', auth })

  let startRow, endRow
  if (!stepConfigRow) {
    startRow = 2
    endRow = 100
  } else {
    startRow = stepConfigRow + 1
    endRow = stepConfigRow + 100
  }
  if (endRow > maxRowCount) endRow = maxRowCount

  // Get column headers
  let columnHeaders, headerResults
  const firstRowRange = { spreadsheetId, range: 'A1:CN1' }
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

  // get all the data
  let dataResults

  const dataRange = { spreadsheetId: spreadsheetId, range: `A${startRow}:CN${endRow}` }
  try {
    dataResults = await sheets.spreadsheets.values.get(dataRange)
  } catch (error) {
    return console.log('The API returned an error getting data: ' + error)
  }

  // Completion
  if (!dataResults.data.values) {
    const date = moment
      .unix(lastImportDate.seconds)
      .tz(timezone)
      .format('YYYY - dddd, MMMM Do [at] h:mm:ss a')

    if (legislatorType === 'federal') {
      await logMessage(`Completed federal import for ${date}!!!`)
    } else {
      await db
        .collection('siteConfig')
        .doc('dataImports')
        .set({ lastImportDate, lastDataImportId: dataImport.id }, { merge: true })
      await logMessage(`Completed state import for ${date}!!!`)
    }
    return null
  }

  const results = []

  const upsertLeader = async leader => {
    const existingLeader = await db.collection('leaders').doc(leader.PID).get()

    // Only add the permaLink if it doesn't exist
    if (!existingLeader.exists) {
      leader.permaLink = `${leader.LastName}-${leader.FirstName}-${leader.PID}`
        .replace(/[^a-z0-9_-]+/gi, '')
        .toLowerCase()
      await logMessage(`New leader: ${leader.permaLink}`)
    } else {
      if (!existingLeader.data().permaLink) {
        await logMessage('Leader already exists but has no permaLink!!')
        throw new Error('Leader already exists but has no permaLink!!')
      }
      leader.permaLink = existingLeader.data().permaLink
    }

    const currentDoc = db
      .collection('states')
      .doc(leader.StateCode)
      .collection('leaders')
      .doc(leader.PID)

    const rootDoc = db.collection('leaders').doc(leader.PID)

    return Promise.all([
      currentDoc.set(leader, { merge: true }),
      rootDoc.set(leader, { merge: true }),
    ])
  }

  for (const row of dataResults.data.values) {
    const leader = { lastImportDate }
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

      results.push(upsertLeader(leader))
    }
  }

  await logMessage(`Updating ${legislatorType} leader rows ${startRow}-${endRow}`)
  await Promise.all(results)

  return db.collection('dataImports').doc(dataImport.id).collection('step').doc().set({
    legislatorType,
    row: endRow,
    timestamp: FieldValue.serverTimestamp(),
    maxRowCount,
  })
}
