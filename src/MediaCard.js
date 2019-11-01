import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: theme.palette.secondary.dark,
  },
  media: {
    height: 350,
  },
}))

export default function MediaCard(props) {
  const classes = useStyles()

  return (
    <Box
      height={525}
      my={3}
      mx={1}
      boxShadow={9}
      border={8}
      borderColor="text.primary"
      borderRadius="borderRadius">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={props.image} title="photo" />
          <Box height={155}>
            <CardContent backgroundcolor="secondary">
              <Typography gutterBottom variant="h6">
                {props.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="p">
                {props.blurb}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  )
}
