import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import ImageUpload from './ImageUpload'
import { useTheme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

export default ({ content }) => {
  const theme = useTheme()
  const [showUpdateImages, setShowUpdateImages] = React.useState()
  const history = useHistory()

  const handleEdit = docId => event => {
    history.push(`/content/edit/${docId}`)
  }

  const handleUpdateImages = () => {
    setShowUpdateImages(true)
  }

  const handleDoneUpdatingImages = () => {
    setShowUpdateImages(false)
  }

  return (
    <>
      {showUpdateImages && <ImageUpload content={content} />}

      {!showUpdateImages && (
        <Button
          style={{ marginRight: theme.spacing(1) }}
          variant="contained"
          color="primary"
          onClick={handleEdit(content.docId)}
        >
          <EditIcon />
          Edit
        </Button>
      )}

      {!showUpdateImages && (
        <Button
          style={{ marginRight: theme.spacing(1) }}
          variant="contained"
          color="primary"
          onClick={handleUpdateImages}
        >
          Update Images
        </Button>
      )}

      {showUpdateImages && (
        <Button
          style={{ marginRight: theme.spacing(1) }}
          variant="contained"
          color="secondary"
          onClick={handleDoneUpdatingImages}
        >
          Done
        </Button>
      )}
    </>
  )
}
