import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const bgcolors = [
  'primary.light',
  'primary.main',
  'primary.dark',
  'primary.contrastText',
  'secondary.light',
  'secondary.main',
  'secondary.dark',
  'secondary.contrastText',
  'background.default',
  'background.paper',
]
const colors = [
  'primary.light',
  'primary.main',
  'primary.dark',
  'primary.contrastText',
  'text.primary',
  'text.secondary',
  'text.disabled',
  'secondary.light',
  'secondary.main',
  'secondary.dark',
  'secondary.contrastText',
]

const ColorBox = ({ bgcolor, color }) => {
  if (bgcolor === color) return null

  return <Box color={color}>color="{color}"</Box>
}

const BackgroundBox = ({ bgcolor }) => {
  return (
    <>
      <Box my={2} p={2} clone>
        <Paper>
          <Box px={1}>bgcolor={bgcolor}</Box>
          <Box my={1} p={2} bgcolor={bgcolor}>
            {colors.map(color => (
              <ColorBox bgcolor={bgcolor} color={color} key={color}>
                color="{color}"
              </ColorBox>
            ))}
            This is a <Link href="#">text link</Link> to some href.
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default () => {
  return (
    <Typography variant="body1">
      {bgcolors.map(bgcolor => (
        <BackgroundBox bgcolor={bgcolor} key={bgcolor} />
      ))}
    </Typography>
  )
}
