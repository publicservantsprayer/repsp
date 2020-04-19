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
    const data = {
      'adminUsers/admin123': { uid: 'admin123' },
    }
    const collectionRef = (db) => db.collection('content')

    test('read-only from all', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.get()).toAllow()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })

    test('write allowed from admin', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('test').set({ foo: 'bar' })).toAllow()
    })

    test('write denied from non admin', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })
  })

  describe('states collection', () => {
    test('read-only from all', async () => {
      const db = await setup()
      const ref = db.collection('states')

      await expect(ref.get()).toAllow()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })

    test('read-only in leaders collectionGroup', async () => {
      const db = await setup()
      const ref = db.collection('leaders')

      await expect(ref.get()).toAllow()
      await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
    })
  })

  describe('adminUsers collection', () => {
    const data = {
      'adminUsers/admin123': { uid: 'admin123' },
    }
    const collectionRef = (db) => db.collection('adminUsers')

    test('get denied from non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.doc('joe123').get()).toDeny()
    })

    test('get allowed from authenticated user', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').get()).toAllow()
    })

    test('list denied to all', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.get()).toDeny()
    })

    test('write denied to all', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').set({ foo: 'bar' })).toDeny()
    })
  })

  describe('userProfiles collection', () => {
    const data = {
      'userProfiles/joe123': { email: 'joe123@test.com' },
      'adminUsers/admin123': { uid: 'admin123' },
    }
    const collectionRef = (db) => db.collection('userProfiles')

    test('get denied from non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.doc('joe123').get()).toDeny()
    })

    test('get allowed from authenticated user', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').get()).toAllow()
    })

    test('list denied to non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.get()).toDeny()
    })

    test('list denied to non-admins', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.get()).toDeny()
    })

    test('list allowed to admins', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.get()).toAllow()
    })

    test('write denied from non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.doc('joe123').set({ foo: 'bar' })).toDeny()
    })

    test('write allowed from authenticated user with same email', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').update({ foo: 'bar' })).toAllow()
      await expect(ref.doc('joe123').update({ foo: 'bar', email: 'joe123@test.com' })).toAllow()
      await expect(ref.doc('joe123').set({ foo: 'bar', email: 'joe123@test.com' })).toAllow()
    })

    test('write denied from authenticated user changing email', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').set({ foo: 'bar' })).toDeny()
      await expect(ref.doc('joe123').set({ foo: 'bar', email: 'different123@test.com' })).toDeny()
    })
  })

  describe('twitterAccounts collection', () => {
    const data = {
      'adminUsers/admin123': { uid: 'admin123' },
    }
    const collectionRef = (db) => db.collection('twitterAccounts')

    test('access denied from non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.doc('Praying4_IN').get()).toDeny()
      await expect(ref.doc('Praying4_IN').set({ foo: 'bar' })).toDeny()
    })

    test('access denied from authenticated user', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('Praying4_IN').get()).toDeny()
      await expect(ref.doc('Praying4_IN').set({ foo: 'bar' })).toDeny()
    })

    test('access allowed from authenticated admin user', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('Praying4_IN').get()).toAllow()
      await expect(ref.doc('Praying4_IN').set({ foo: 'bar' })).toAllow()
    })
  })

  describe('userSecrets collection', () => {
    const data = {
      'adminUsers/admin123': { uid: 'admin123' },
      'adminUsers/admin456': { uid: 'admin456' },
      'userSecrets/admin123': { uid: 'admin123' },
    }
    const collectionRef = (db) => db.collection('userSecrets')

    test('access denied from non-authenticated user', async () => {
      const ref = collectionRef(await setup(null, data))

      await expect(ref.doc('admin123').get()).toDeny()
      await expect(ref.doc('admin123').set({ foo: 'bar' })).toDeny()
    })

    test('access denied from authenticated user', async () => {
      const ref = collectionRef(await setup({ uid: 'joe123' }, data))

      await expect(ref.doc('joe123').get()).toDeny()
      await expect(ref.doc('joe123').set({ foo: 'bar' })).toDeny()
    })

    test('read denied from authenticated admin user to their own', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('admin123').get()).toDeny()
    })

    test('write allowed from authenticated admin user to their own', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('admin123').set({ foo: 'bar' })).toAllow()
    })

    test('read denied from authenticated admin user to another', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('admin456').get()).toDeny()
    })

    test('write denied from authenticated admin user to another', async () => {
      const ref = collectionRef(await setup({ uid: 'admin123' }, data))

      await expect(ref.doc('admin456').set({ foo: 'bar' })).toDeny()
    })
  })
})
