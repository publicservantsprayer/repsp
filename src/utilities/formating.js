import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const H1 = ({ children }) =>
  <Typography variant="h2" component="h1" gutterBottom>{children}</Typography>

export const H2 = ({ children }) =>
  <Typography variant="h4" component="h2" gutterBottom>{children}</Typography>

export const P = ({ children }) =>
  <Typography variant="body1" component="p">{children}</Typography>
