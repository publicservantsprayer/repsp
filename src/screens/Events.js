import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Link from '@material-ui/core/Link'

import MediaCard from '../MediaCard'
import { withFirebase } from '../Firebase'

const fakeDb = [
  {
    title: 'International Prayer with Leaders',
    image:
      'https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516730122882-86O0JM8Q0PAKCQIUXHNN/ke17ZwdGBToddI8pDm48kBa9hJZBs0vhP4TILrFPdIZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmEczKEiHaQrO44vfJ0kKvIA2J-j_lQ9JnVm2y0-n2FU57cWDZC5qU3cZuU_QHivgV/21318833_10214446028892697_6197402969921247544_o.jpg?format=2500w',
    blurb: 'Getting a chance to pray with leaders around the world',
  },
]

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <MediaCard
      title={article.title}
      image={article.image}
      blurb={article.blurb}
    />
  </Grid>
)
export default withFirebase(({ db }) => {
  const [docs, loading, error] = useCollectionData(
    db.collection('content').where('category', '==', 'events'),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error getting docs: ', error)

  return (
    <Container maxWidth="lg">
      <p></p>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={10}
      >
        {loading && '... loading'}
        {docs &&
          docs.map((article, i) => <ArticleGrid article={article} key={i} />)}
      </Grid>
    </Container>
  )
})
