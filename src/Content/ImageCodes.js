import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { useDownloadURL } from 'react-firebase-hooks/storage'

import { useFirebase } from '../utilities/firebase'

const ImageCode = ({ image }) => {
  const { storageRef } = useFirebase()
  const [src, , error] = useDownloadURL(storageRef.child('content/' + image))
  const [copyText, setCopyText] = React.useState('Copy Snippet')

  if (error) console.log('Error loading image code: ', error)
  if (!src) return null

  const handleCopy = () => {
    navigator.clipboard.writeText('![Alt text](' + src + ' "Optional Title")')
    setCopyText('Snippet Copied')
  }

  return (
    <Box p={2}>
      <img style={{ width: '100%' }} src={src} alt="" />
      <Box
        p={1}
        bgcolor="primary.dark"
        border={1}
        fontSize={10}
        fontFamily="Monospace"
        overflow="hidden">
        <code>
          <pre>{'![Alt text](' + src + ' "Optional Title")'}</pre>
        </code>
        <Button variant="outlined" size="small" onClick={handleCopy}>
          {copyText}
        </Button>
      </Box>
    </Box>
  )
}

export default function ImageCodes({ images }) {
  const [show, setShow] = React.useState(false)
  const toggleImageCode = () => {
    console.log('toggled, show = ', show)
    setShow(!show)
  }
  if (!images) return null
  if (Object.keys(images).length < 1) return null

  return (
    <>
      <Button variant="outlined" onClick={toggleImageCode}>
        Image Codes
      </Button>
      {show && images.map(image => <ImageCode image={image} key={image} />)}
    </>
  )
}
