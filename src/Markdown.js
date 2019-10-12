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

const LinkButton = ({ children, ...restOfProps }) => {
  return (
    <Button variant="contained" {...restOfProps}>
      {children}
    </Button>
  )
}

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
      component: Link,
      props: { component: LinkButton, color: 'secondary' },
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

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />
}
