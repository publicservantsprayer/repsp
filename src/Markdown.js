import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
})

const Image = props => {
  return <img style={{ maxWidth: '100%', height: 'auto' }} alt="" {...props} />
}

const LinkButton = React.forwardRef(({ children, href, to, ...restOfProps }, ref) => {
  const component = href ? Link : RouterLink

  return (
    <Link to={to} href={href} component={component}>
      <Button ref={ref} variant="contained" {...restOfProps}>
        {children}
      </Button>
    </Link>
  )
})

const options = {
  overrides: {
    h1: { component: Typography, props: { variant: 'h1', gutterBottom: true } },
    h2: { component: Typography, props: { variant: 'h2', gutterBottom: true } },
    h3: { component: Typography, props: { variant: 'h3', gutterBottom: true } },
    h4: { component: Typography, props: { variant: 'h4', gutterBottom: true } },
    h5: { component: Typography, props: { variant: 'subtitle1', gutterBottom: true } },
    h6: { component: Typography, props: { variant: 'subtitle2', gutterBottom: true } },

    p: { component: Typography, props: { variant: 'body1', paragraph: true } },

    a: { component: Link },
    img: { component: Image },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
    Button: {
      component: LinkButton,
      props: { variant: 'contained', color: 'primary' },
    },
    hr: { component: Divider },
  },
}

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />
}
