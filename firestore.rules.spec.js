const { setup, teardown } = require('./spec/helpers')


describe('Unathenticated rules', () => {
  let db

  beforeAll(async () => db = await setup())

  afterAll(async () => await teardown())

  test('fail when reading/writing to an unauthorized collection', async () => {
    const ref = db.collection('nonexistent-collection')

    await expect(ref.get()).toDeny()
    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })

  test('fail when reading/writing to adminUsers', async () => {
    const ref = db.collection('adminUsers')

    await expect(ref.get()).toDeny()
    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })

  test('read-only from states', async () => {
    const ref = db.collection('states')

    await expect(ref.get()).toAllow()
    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })

  test('read-only from content', async () => {
    const ref = db.collection('content')

    await expect(ref.get()).toAllow()
    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })
})

describe('Authenticated rules', () => {
  const data = {
    'adminUsers/admin123': { 'uid': 'admin123' }
  }

  afterAll(async () => await teardown())

  test('write allowed from admin', async () => {
    db = await setup({ uid: 'admin123' }, data)
    const ref = db.collection('content')

    await expect(ref.doc('test').set({ foo: 'bar' })).toAllow()
  })

  test('write denied from non admin', async () => {
    db = await setup({ uid: 'joe123' }, data)
    const ref = db.collection('content')

    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })
})
