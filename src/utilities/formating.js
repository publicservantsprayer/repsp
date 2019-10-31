import React from 'react'
import Typography from '@material-ui/core/Typography'

export const H1 = ({ children }) => (
  <Typography variant="h1" component="h1" gutterBottom>
    {children}
  </Typography>
)

export const H2 = ({ children }) => (
  <Typography variant="h2" component="h2" gutterBottom>
    {children}
  </Typography>
)

export const H3 = ({ children }) => (
  <Typography variant="h3" component="h2" gutterBottom>
    {children}
  </Typography>
)

export const H4 = ({ children }) => (
  <Typography variant="h4" component="h2" gutterBottom>
    {children}
  </Typography>
)

export const H5 = ({ children }) => (
  <Typography variant="h5" component="h2" gutterBottom>
    {children}
  </Typography>
)

export const H6 = ({ children }) => (
  <Typography variant="h6" component="h2" gutterBottom>
    {children}
  </Typography>
)

export const P = ({ children }) => (
  <Typography variant="body1" component="p" align="left">
    {children}
  </Typography>
)

export const P2 = ({ children }) => (
  <Typography variant="body2" component="p" align="left">
    {children}
  </Typography>
)
