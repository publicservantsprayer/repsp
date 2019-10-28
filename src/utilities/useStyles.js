
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => {
  return ({
    borderRadius: {
      borderRadius: theme.shape.borderRadius,
    },
    topBorderRadius: {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    },
  })
})
