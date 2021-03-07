const admin = require('firebase-admin')
const db = admin.firestore()
const { FieldValue } = admin.firestore
const { stateCodes } = require('../utilities/states')

module.exports.handleUpdateLastImport = async change => {
  const siteConfig = change.after.data()
  const { lastImportDate, lastDataImportId } = siteConfig

  const importLog = async (message, legislatorType) => {
    return db.collection('dataImports').doc(lastDataImportId).collection('importLog').doc().set({
      legislatorType,
      message,
      timestamp: FieldValue.serverTimestamp(),
    })
  }

  const writes = stateCodes.map(stateCode => {
    return db.collection('dataImports').doc(lastDataImportId).collection('removeStep').doc().set({
      stateCode,
      lastImportDate,
      dataImportId: lastDataImportId,
    })
  })

  await Promise.all(writes)

  return Promise.all([importLog('Almost done!', 'state'), importLog('Almost done!', 'federal')])
}
