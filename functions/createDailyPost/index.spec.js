const firebase = require('firebase')

const { setup, setupAdmin, teardown } = require('../../spec/helpers')
const { createDailyPost } = require('./')

const lastImportDate = new Date('2021-01-01')

describe('createPostForState without previous posts', () => {
  let db

  const data = {
    'states/IN/leaders/1': { PID: '1', LastName: 'a', lastImportDate },
    'states/IN/leaders/2': { PID: '2', LastName: 'b', lastImportDate },
    'states/IN/leaders/3': { PID: '3', LastName: 'c', lastImportDate },
    'states/IN/leaders/4': { PID: '4', LastName: 'd', lastImportDate },
  }

  beforeAll(async () => (db = await setupAdmin(data)))
  afterAll(async () => await teardown())

  test('basic test', async () => {
    const dateID = '2019-01-01'
    await createDailyPost(db, 'IN', dateID)

    doc = await db.doc('states/IN/posts/2019-01-01').get()

    expect(doc.data().dateID).toEqual('2019-01-01')
    expect(doc.data().leader1.PID).toBe('1')
    expect(doc.data().leader2.PID).toBe('2')
    expect(doc.data().leader3.PID).toBe('3')
  })
})

describe('createPostForState with previous posts of same last name', () => {
  let db

  const data = {
    'states/IN/leaders/1': { PID: '1', LastName: 'a', hasPhoto: true, lastImportDate },
    'states/IN/leaders/2': { PID: '2', LastName: 'b', hasPhoto: true, lastImportDate },
    'states/IN/leaders/3': { PID: '3', LastName: 'c', hasPhoto: true, lastImportDate },
    'states/IN/leaders/4': { PID: '4', LastName: 'c', hasPhoto: true, lastImportDate },
    'states/IN/leaders/5': { PID: '5', LastName: 'c', hasPhoto: true, lastImportDate },
    'states/IN/leaders/6': { PID: '6', LastName: 'd', hasPhoto: true, lastImportDate },
    'states/IN/leaders/7': { PID: '7', LastName: 'e', hasPhoto: true, lastImportDate },
    'states/IN/posts/2019-01-01': {
      leader1: { PID: '1', LastName: 'a', hasPhoto: true, lastImportDate },
      leader2: { PID: '2', LastName: 'b', hasPhoto: true, lastImportDate },
      leader3: { PID: '3', LastName: 'c', hasPhoto: true, lastImportDate },
    },
  }

  beforeAll(async () => (db = await setupAdmin(data)))
  afterAll(async () => await teardown())

  test('basic test', async () => {
    await createDailyPost(db, 'IN', '2019-01-02')

    doc = await db.doc('states/IN/posts/2019-01-02').get()

    expect(doc.data().dateID).toEqual('2019-01-02')
    expect(doc.data().leader1.PID).toBe('4')
    expect(doc.data().leader2.PID).toBe('5')
    expect(doc.data().leader3.PID).toBe('6')
  })
})
describe('createPostForState with previous posts that wraps around', () => {
  let db

  const data = {
    'states/IN/leaders/1': { PID: '1', LastName: 'a', hasPhoto: true, lastImportDate },
    'states/IN/leaders/2': { PID: '2', LastName: 'b', hasPhoto: true, lastImportDate },
    'states/IN/leaders/3': { PID: '3', LastName: 'c', hasPhoto: true, lastImportDate },
    'states/IN/leaders/4': { PID: '4', LastName: 'd', hasPhoto: true, lastImportDate },
    'states/IN/leaders/5': { PID: '5', LastName: 'e', hasPhoto: true, lastImportDate },
    'states/IN/leaders/6': { PID: '6', LastName: 'f', hasPhoto: true, lastImportDate },
    'states/IN/leaders/7': { PID: '7', LastName: 'g', hasPhoto: true, lastImportDate },
    'states/IN/posts/2019-01-01': {
      leader1: { PID: '4', LastName: 'd' },
      leader2: { PID: '5', LastName: 'e' },
      leader3: { PID: '6', LastName: 'f' },
    },
  }

  beforeAll(async () => (db = await setupAdmin(data)))
  afterAll(async () => await teardown())

  test('basic test', async () => {
    await createDailyPost(db, 'IN', '2019-01-02')

    doc = await db.doc('states/IN/posts/2019-01-02').get()

    expect(doc.data().dateID).toEqual('2019-01-02')
    expect(doc.data().leader1.PID).toBe('7')
    expect(doc.data().leader2.PID).toBe('1')
    expect(doc.data().leader3.PID).toBe('2')
  })
})
