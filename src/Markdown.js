import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
})

const Image = props => {
  return <img style={{ maxWidth: '100%', height: 'auto' }} alt="" {...props} />
}

const LinkButton = React.forwardRef(({ children, ...restOfProps }, ref) => {
  return (
    <Button ref={ref} variant="contained" {...restOfProps}>
      {children}
    </Button>
  )
})

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h1',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h2' } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h3' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h4', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true, component: 'div' } },

    a: {
      component: Link
    },
    img: {
      component: Image,
    },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
}

export default props => {
  return <ReactMarkdown options={options} {...props} />
}
