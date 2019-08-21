const firebase = require('@firebase/testing')
const fs = require('fs')

module.exports.setup = async (auth, data) => {
  const projectId = `repsp-spec-${Date.now()}`
  const app = await firebase.initializeTestApp({
    projectId,
    auth
  })

  const db = app.firestore()

  // Seed data
  if (data) {
    for (const key in data) {
      const ref = db.doc(key)
      await ref.set(data[key])
    }
  }

  // Apply rules
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules')
  })

  return db
}

module.exports.setupAdmin = async (data) => {
  const projectId = `repsp-spec-${Date.now()}`
  const app = await firebase.initializeAdminApp({
    projectId
  })

  const db = app.firestore()

  // Seed data
  if (data) {
    for (const key in data) {
      const ref = db.doc(key)
      await ref.set(data[key])
    }
  }

  return db
}

module.exports.teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()))
}

expect.extend({
  async toAllow (x) {
    let pass = false

    try {
      await firebase.assertSucceeds(x)
      pass = true
    } catch (error) { }

    return {
      pass,
      message: () => 'Expected Firebase operation to be allowed, but it failed'
    }
  }
})

expect.extend({
  async toDeny (x) {
    let pass = false

    try {
      await firebase.assertFails(x)
      pass = true
    } catch (error) { }

    return {
      pass,
      message: () => 'Expected Firebase operation to be denied, but it was allowed'
    }
  }
})

