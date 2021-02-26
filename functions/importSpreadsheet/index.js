const admin = require('firebase-admin')
const db = admin.firestore()

const { importSpreadsheet } = require('./importSpreadsheet')
// const { inspect } = require('util')

module.exports.importSpreadsheet = async snap => {
  // console.log(`data: ${inspect(data)}`)
  // console.log(`context: ${inspect(context)}`)
  const dataImport = snap.data()
  dataImport.id = snap.id

  // start importing spreadsheet
  console.log('Importing both federal and state...')

  return Promise.all([
    importSpreadsheet(db, dataImport, { row: 2, legislatorType: 'federal' }),
    importSpreadsheet(db, dataImport, { row: 2, legislatorType: 'state' }),
  ])
}

module.exports.importSpreadsheetStep = async (snap, context) => {
  const dataImportDoc = await db.collection('dataImports').doc(context.params.dataImportId).get()

  if (!dataImportDoc.exists) console.error('no dataImport doc found')

  const dataImport = dataImportDoc.data()
  dataImport.id = context.params.dataImportId
  const dataImportStep = snap.data()

  // start importing spreadsheet
  console.log('preforming step...')

  return await importSpreadsheet(db, dataImport, dataImportStep)
}
