const { setup, teardown } = require('./spec/helpers')

describe('Database rules', () => {
  let db
  let ref

  beforeAll(async () => {
    db = await setup()
    ref = db.collection('nonexistent-collection')
  })

  afterAll(async () => {
    await teardown()
  })

  test('fail when reading/writing to an unauthorized collection', async () => {
    await expect(ref.get()).toAllow()
    await expect(ref.doc('test').set({ foo: 'bar' })).toDeny()
  })
})
