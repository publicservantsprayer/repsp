const moment = require('moment')

const previousDayID = dateID => moment(dateID).subtract(1, 'day').format('YYYY-MM-DD')

const createPost = async (dateID, docs, postsRef) => {
  return postsRef.doc(dateID).set({
    dateID: dateID,
    leader1: docs[0].data(),
    leader2: docs[1].data(),
    leader3: docs[2].data(),
  })
}

module.exports.createDailyPost = async (db, stateCode, dateID) => {
  const leadersRef = db
    .collection('states')
    .doc(stateCode)
    .collection('leaders')
    .orderBy('LastName')
    .orderBy('PID')
  const postsRef = db.collection('states').doc(stateCode).collection('posts')

  const previousPost = await postsRef.doc(previousDayID(dateID)).get()

  const firstThree = await leadersRef.limit(3).get()
  let docs = firstThree.docs

  if (previousPost.exists) {
    const lastLeader = previousPost.data().leader3

    // look up startAfter docs
    const nextThree = await leadersRef
      .startAfter(lastLeader.LastName, lastLeader.PID)
      .limit(3)
      .get()
    // Add on the first three in case we need to wrap
    docs = nextThree.docs.concat(docs)
  }

  return createPost(dateID, docs, postsRef)
}
