const { google } = require('googleapis')

const { statesObj, stateCodes, regionForStateCode } = require('../utilities/states')
const { requiredFields } = require('./requiredFields')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp.fromDate(new Date())

module.exports.importSpreadsheet = async (db, url, auth) => {
  const spreadsheetId = url.split('/')[5]
  const sheets = google.sheets({ version: 'v4', auth })

  let columnHeaders, headerResults
  const firstRowRange = { spreadsheetId: spreadsheetId, range: 'A1:CN1' }
  try {
    headerResults = await sheets.spreadsheets.values.get(firstRowRange)
  } catch (error) {
    return console.log('The API returned an error getting header: ' + error)
  }
  columnHeaders = headerResults.data.values[0].reduce((obj, value, index) => {
    obj[value] = index
    return obj
  }, {})

  let dataResults
  const dataRange = { spreadsheetId: spreadsheetId, range: 'A2:CN' }
  try {
    dataResults = await sheets.spreadsheets.values.get(dataRange)
  } catch (error) {
    return console.log('The API returned an error getting data: ' + error)
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

      const doc = db
        .collection('states')
        .doc(leader.StateCode)
        .collection('leaders')
        .doc(leader.permaLink)
      try {
        // eslint-disable-next-line no-await-in-loop
        await doc.set(leader)
        //console.log('Added: ', leader.permaLink)
      } catch (error) {
        console.log('Error setting leader: ', leader.permaLink, error)
      }
    }
  }
  return null
}

module.exports.addStateNameAndRegion = async db => {
  const writes = stateCodes.map(stateCode => {
    return db
      .collection('states')
      .doc(stateCode)
      .set({
        name: statesObj[stateCode],
        region: regionForStateCode(stateCode),
      })
  })
  return Promise.all(writes)
}
