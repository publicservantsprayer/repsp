const firebase = require('firebase')

const { setup, setupAdmin, teardown } = require('../../spec/helpers')
const { createUserProfile } = require('./createUserProfile')

describe('createUserProfile with existing profile', () => {
  let db

  const data = {
    'userProfiles/123': {
      email: 'test@user.com',
      sendDailyEmail: false,
      dailyEmailStateCode: 'TX',
    }
  }

  beforeAll(async () => db = await setupAdmin(data))
  afterAll(async () => await teardown())

  test('basic test', async () => {
    const user = { uid: '123', email: 'test@user.com' }
    await createUserProfile(db, user)

    doc = await db.doc('userProfiles/123').get()

    expect(doc.data().sendDailyEmail).toEqual(false)
    expect(doc.data().dailyEmailStateCode).toEqual('TX')
  })
})


describe('createUserProfile without existing profile', () => {
  let db

  beforeAll(async () => db = await setupAdmin())
  afterAll(async () => await teardown())

  test('basic test', async () => {
    const user = { uid: '123', email: 'test@user.com' }
    await createUserProfile(db, user)

    doc = await db.doc('userProfiles/123').get()

    expect(doc.data().sendDailyEmail).toEqual(true)
    expect(doc.data().dailyEmailStateCode).toEqual(undefined)
    expect(doc.data().email).toEqual('test@user.com')
  })
})
