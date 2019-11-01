import React from 'react'
import shortid from 'shortid'
import slugify from 'slugify'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import { useFirebase } from '../firebase'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function ImageUpload({ content }) {
  const { firebase, db, storageRef } = useFirebase()

  if (!Array.isArray(content.images)) content.images = []

  const saveImageName = image => {
    content.images.push(image)
    saveContent()
  }

  const saveContent = async images => {
    try {
      await db
        .collection('content')
        .doc(content.docId)
        .set(content)
    } catch (error) {
      console.log('Error writing to db: ', error)
    }
  }

  const deleteFile = async name => {
    try {
      await storageRef.child('content/' + name).delete()
    } catch (error) {
      console.log('Error deleting file: ', name)
    }
  }

  const onupdatefiles = updatedFiles => {
    const updatedNames = updatedFiles.map(file => file.serverId)
    if (updatedNames.includes(null)) return null
    if (updatedNames.length === content.images.length) return null

    content.images.forEach(name => {
      if (!updatedNames.includes(name)) deleteFile(name)
    })
    content.images = updatedNames
    saveContent()
  }

  const defaultImages = content.images.map(image => {
    return { source: image, options: { type: 'local' } }
  })

  const processImageUpload = (fieldName, file, metadata, load, error, progress, abort) => {
    const id = shortid.generate()
    const imageName = `${id}-${slugify(file.name)}`
    const uploadTask = storageRef.child('content/' + imageName).put(file)

    const handleImageUploaded = () => {
      load(imageName)
      saveImageName(imageName)
    }

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snap => {
        progress(true, snap.bytesTransferred, snap.totalBytes)
      },
      err => {
        error(err.message)
      },
      handleImageUploaded
    )
  }

  const loadImageIntoFilePond = (imageName, load, error, progress, abort) => {
    progress(true, 0, 1024)
    storageRef
      .child('content/' + imageName)
      .getDownloadURL()
      .then(url => {
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function(event) {
          let blob = xhr.response
          load(blob)
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(err => {
        error(err.message)
        abort()
      })
  }

  const serverConfig = {
    process: processImageUpload,
    load: loadImageIntoFilePond,
  }

  return (
    <FilePond
      files={defaultImages}
      allowMultiple={true}
      maxFiles={144}
      onupdatefiles={onupdatefiles}
      server={serverConfig}
    />
  )
}
