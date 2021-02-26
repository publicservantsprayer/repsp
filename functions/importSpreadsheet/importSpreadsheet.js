const { google } = require('googleapis')

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

  const credentials = {
    installed: {
      client_id: '906637795345-v51cojk2mmc626arao7iq1mjkjghd65u.apps.googleusercontent.com',
      project_id: 'quickstart-1611769086690',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: 'Sz3CM-xB6OACeJAFqHzg50Nc',
      redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
    },
  }
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  const token = {
    // command line:
    // access_token:
    //   'ya29.a0AfH6SMDOwpThVvwOMd2I8xpT3ljVHqSldjFoAjFqgO9dXWBfojxsyZUjbFAAZt_SoivRFQgMfN6gSoefE7LkaJApvwDbsATZlLhQvDId0kvmvRUVSnwpWCstiGk67fFQ2MtxyPLZgsi9-rJqrcs_NZSRDbrBZv3fBEoPyJDfE_0',

    // from web auth:
    // access_token:
    //   'ya29.a0AfH6SMBLpxPXDp_jPGdecOR9_lnXnCFEAj549KieLFAKMm53w4luDPa9gd30xhlhYZrqTnNjzD1xsUciKWXR5uZd3BQmOggM5qHd0HEfj6TO50ONu2vFgmN9zHeAVaMV0cS26nDA-V87gPoU_tiirgFQf7cyMBy6ngnTcAiSOTrA',
    access_token:
      'ya29.A0AfH6SMB5v2oI0Ocmdm6wx6Ohk5fuK8nXAMmTIXONB_90CP3QGRXRXML28DZeTJzWcAFQbcqCAf8A7XS_ujCyybaVd8mw9YRQGayp1tjKwHasj0vav_ccukWcgN55w3KOsGe4CANfQCntHE3CqcvbVy8CqSCEig',

    // both work with same refresh token
    refresh_token:
      '1//043SYV95amJsmCgYIARAAGAQSNwF-L9IrS1erHGQVEsh6BxWzemgj0CUKlBP-P7Ogfc47oZXdEm8zHV-GnPEzh0w01WqgaXdrW64',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    token_type: 'Bearer',
    expiry_date: 1611790477292,
  }

  oAuth2Client.setCredentials(token)

  // google.options({ auth })

  // const sheets = google.sheets({ version: 'v4' })
  const sheets = google.sheets({ version: 'v4', auth: oAuth2Client })

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

      const doc = db
        .collection('states')
        .doc(leader.StateCode)
        .collection('leaders')
        .doc(leader.permaLink)
      try {
        results.push(setLeader(doc, leader))
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
