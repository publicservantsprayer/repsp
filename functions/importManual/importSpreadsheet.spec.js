const { setup, setupAdmin, teardown } = require('../../spec/helpers')
const { importSpreadsheet } = require('./importSpreadsheet')
const { authorize } = require('./authorize')

describe.skip('importSpreadsheet imports data', () => {
  let db

  beforeAll(async () => {
    db = await setupAdmin()
    const auth = await authorize()
    const url =
      'https://docs.google.com/spreadsheets/d/1Lr5IsaQq9BojEXELIrwjX26uJfpsIkfggvSo6me-Se4/edit#gid=1144399491'
    await importSpreadsheet(db, url, auth)
  })

  afterAll(async () => await teardown())

  test('reads data from google sheets and imports it into firestore', async () => {
    const doc = await db.doc('states/IN/leaders/abbott-david-654968').get()

    expect(doc.data().PID).toBe('654968')
    expect(doc.data().permaLink).toBe('abbott-david-654968')
    expect(doc.data().hasPhoto).toBe(true)
  })

  test('without a photofile, hasPhoto is set to false', async () => {
    const doc = await db.doc('states/LA/leaders/turner-christopher-697909').get()

    expect(doc.data().hasPhoto).toBe(false)
  })

  test('vacant rows are not added', async () => {
    const doc = await db.doc('states/ME/leaders/vacant-undefined-690287').get()

    expect(doc.exists).toBe(false)
  })

  test('only 50 states are added', async () => {
    const doc = await db.doc('states/AS/leaders/ale-savali-192881').get()

    expect(doc.exists).toBe(false)
  })
})
