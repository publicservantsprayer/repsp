const { setup, teardown } = require('./spec/helpers')

describe(' Database rules', () => {

  afterAll(async () => await teardown())

  describe('non-existent collection', () => {

    test('reading/writing denied from all', async () => {
      const db = await setup()
      const ref = db.collection('nonexistent-collection')

      await expect(ref.get()).toDeny()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })
  })

  describe('content collection', () => {
    test('read-only from all', async () => {
      const db = await setup()
      const ref = db.collection('content')

      await expect(ref.get()).toAllow()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })

    describe('authenticated', () => {
      const data = {
        'adminUsers/admin123': { 'uid': 'admin123' }
      }

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
  })

  describe('states collection', () => {
    test('read-only from all', async () => {
      const db = await setup()
      const ref = db.collection('states')

      await expect(ref.get()).toAllow()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })
  })

  describe('adminUsers collection', () => {
    const data = {
      'adminUsers/admin123': { 'uid': 'admin123' }
    }

    test('get denied from non-authenticated user', async () => {
      db = await setup(null, data)
      const ref = db.collection('adminUsers')

      await expect(ref.doc('joe123').get()).toDeny()
    })

    test('get allowed from authenticated user', async () => {
      db = await setup({ uid: 'joe123' }, data)
      const ref = db.collection('adminUsers')

      await expect(ref.doc('joe123').get()).toAllow()
    })

    test('list denied to all', async () => {
      db = await setup({ uid: 'joe123' }, data)
      const ref = db.collection('adminUsers')

      await expect(ref.get()).toDeny()
    })

    test('write denied to all', async () => {
      db = await setup({ uid: 'joe123' }, data)
      const ref = db.collection('adminUsers')

      await expect(ref.doc('joe123').set({ foo: 'bar' })).toDeny()
    })
  })
})
