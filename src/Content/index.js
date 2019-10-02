import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import { H1 } from '../utilities/formating'
import { withFirebase } from '../firebase'
import List from './List'
import New from './New'
import Edit from './Edit'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(5)
  },
}))

export default withFirebase(({ db }) => {
  const classes = useStyles()
  const [showList, setShowList] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editDocId, setEditDocId] = useState('')

  const handleShowList = () => {
    setShowList(true)
    setShowEdit(false)
    setShowNew(false)
  }

  const handleEdit = docId => event => {
    setShowEdit(true)
    setShowNew(false)
    setShowList(false)
    setEditDocId(docId)
  }

  const handleCancelEdit = () => {
    setShowList(true)
    setShowEdit(false)
    setShowNew(false)
    setEditDocId('')
  }

  const handleNew = () => {
    setShowNew(true)
    setShowEdit(false)
    setShowList(false)

  }

  const handleCancelNew = () => {
    setShowList(true)
    setShowNew(false)
    setShowEdit(false)
  }


  return (
    <Box bgcolor="secondary" py={1}>
      <H1>Content</H1>

      {showList && <List handleEdit={handleEdit} />}
      {showEdit && <Edit docId={editDocId} handleCancelEdit={handleCancelEdit} showList={handleShowList} />}

      {!showNew &&
        <Fab color="primary" className={classes.fab} onClick={handleNew}>
          <AddIcon />
        </Fab>}

      {showNew && <New handleCancelNew={handleCancelNew} showList={handleShowList} />}
    </Box>
  )
})

