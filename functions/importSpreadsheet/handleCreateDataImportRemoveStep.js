const admin = require('firebase-admin')
const db = admin.firestore()
const { FieldValue } = admin.firestore
const moment = require('moment-timezone')
const timezone = 'America/New_York'

const importLog = async (dataImportId, data) => {
  return db
    .collection('dataImports')
    .doc(dataImportId)
    .collection('importLog')
    .doc()
    .set({ timestamp: FieldValue.serverTimestamp(), ...data })
}

const deleteLeader = async (leader, stateCode, dataImportId) => {
  const leaderData = leader.data()
  const leaderDoc = db.collection('states').doc(stateCode).collection('leaders').doc(leader.id)
  await leaderDoc.delete()

  const date = moment
    .unix(leaderData.lastImportDate.seconds)
    .tz(timezone)
    .format('YYYY - dddd, MMMM Do [at] h:mm:ss a')

  await importLog(dataImportId, {
    legislatorType: leaderData.LegType === 'SL' ? 'state' : 'federal',
    message: `Removed ${leaderData.permaLink}, last imported: ${date}`,
  })
}

module.exports.handleCreateDataImportRemoveStep = async snapshot => {
  const removeStep = snapshot.data()
  const { stateCode, lastImportDate, dataImportId } = removeStep

  const leadersRef = db
    .collection('states')
    .doc(stateCode)
    .collection('leaders')
    .where('lastImportDate', '<', lastImportDate)

  const results = await leadersRef.get()
  const deleteCount = results.docs.length
  const deletes = results.docs.map(leader => {
    return deleteLeader(leader, stateCode, dataImportId)
  })

  await Promise.all(deletes)
  return importLog(dataImportId, {
    message: `${stateCode} - Removed ${deleteCount} from current legislators`,
  })
}
