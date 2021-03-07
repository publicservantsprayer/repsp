const admin = require('firebase-admin')
const db = admin.firestore()
const { google } = require('googleapis')
const functions = require('firebase-functions')
const auth = functions.config().browser.apikey

const { importSpreadsheet } = require('./importSpreadsheet')

const sheets = google.sheets({ version: 'v4', auth })

module.exports.handleCreateDataImport = async snap => {
  const dataImport = snap.data()
  dataImport.id = snap.id

  const federalSheetsResults = await sheets.spreadsheets.get({
    spreadsheetId: dataImport.federalMembersUrl.split('/')[5],
    fields: 'sheets.properties',
  })
  const federalMaxRowCount = federalSheetsResults.data.sheets[0].properties.gridProperties.rowCount

  const stateSheetsResults = await sheets.spreadsheets.get({
    spreadsheetId: dataImport.stateMembersUrl.split('/')[5],
    fields: 'sheets.properties',
  })
  const stateMaxRowCount = stateSheetsResults.data.sheets[0].properties.gridProperties.rowCount

  return Promise.all([
    importSpreadsheet(db, dataImport, {
      legislatorType: 'federal',
      maxRowCount: federalMaxRowCount,
    }),
    importSpreadsheet(db, dataImport, { legislatorType: 'state', maxRowCount: stateMaxRowCount }),
  ])
}

module.exports.handleCreateDataImportStep = async (snap, context) => {
  const dataImportDoc = await db.collection('dataImports').doc(context.params.dataImportId).get()

  if (!dataImportDoc.exists) console.error('no dataImport doc found')

  const dataImport = dataImportDoc.data()
  dataImport.id = context.params.dataImportId
  const stepConfig = snap.data()

  return await importSpreadsheet(db, dataImport, stepConfig)
}
