import React from 'react'
import Box from '@material-ui/core/Box'
import MuiTypography from '@material-ui/core/Typography'
import MuiPaper from '@material-ui/core/Paper'

const Paper = ({ children }) => {
  return (
    <Box p={2} clone>
      <MuiPaper>{children}</MuiPaper>
    </Box>
  )
}

export default function Typography() {
  return (
    <Paper p={2}>
      <MuiTypography variant="h1" component="h2" gutterBottom>
        h1. Heading
      </MuiTypography>
      <MuiTypography variant="h2" gutterBottom>
        h2. Heading
      </MuiTypography>
      <MuiTypography variant="h3" gutterBottom>
        h3. Heading
      </MuiTypography>
      <MuiTypography variant="h4" gutterBottom>
        h4. Heading
      </MuiTypography>
      <MuiTypography variant="h5" gutterBottom>
        h5. Heading
      </MuiTypography>
      <MuiTypography variant="h6" gutterBottom>
        h6. Heading
      </MuiTypography>
      <MuiTypography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </MuiTypography>
      <MuiTypography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </MuiTypography>
      <MuiTypography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </MuiTypography>
      <MuiTypography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </MuiTypography>
      <MuiTypography variant="button" display="block" gutterBottom>
        button text
      </MuiTypography>
      <MuiTypography variant="caption" display="block" gutterBottom>
        caption text
      </MuiTypography>
      <MuiTypography variant="overline" display="block" gutterBottom>
        overline text
      </MuiTypography>
    </Paper>
  )
}
