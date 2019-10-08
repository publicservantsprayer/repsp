import React from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useStateCode } from './utilities/states'

const FirebaseContext = React.createContext(null)

export const FirebaseProvider = FirebaseContext.Provider

export const useFirebase = () => {
  const firebase = React.useContext(FirebaseContext)

  return {
    firebase: firebase,
    db: firebase.firestore(),
    auth: firebase.auth(),
    storage: firebase.storage(),
    storageRef: firebase.storage().ref(),
  }
}

export const useContentCollection = category => {
  const { db } = useFirebase()
  const [docs, loading, error] = useCollectionData(
    db
      .collection('content')
      .where('category', '==', category)
      .orderBy('createdOn', 'desc'),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error loading news: ', error)

  return [docs, loading, error]
}

export const useContentItem = docId => {
  const { db } = useFirebase()
  const [doc, loading, error] = useDocumentData(
    db.collection('content').doc(docId),
    { idField: 'docId' }
  )
  if (error) console.log('Error getting content item: ', docId, error)

  return [doc, loading, error]
}

export const useDailyPost = () => {
  const { db } = useFirebase()
  const stateCode = useStateCode()

  const [posts, loading, error] = useCollectionData(
    db
      .collection(`/states/${stateCode}/posts/`)
      .orderBy('dateID', 'desc')
      .limit(1)
  )

  if (error) console.log('Error loading news: ', error)

  if (Array.isArray(posts)) return [posts[0], loading, error]
  else return [false, loading, error]
}

export const useUser = () => {
  const { auth } = useFirebase()
  const [user, loading, error] = useAuthState(auth)

  return [user, loading, error]
}

export const useAdmin = () => {
  const [admin, setAdmin] = React.useState()
  const { db } = useFirebase()
  const [user, loading, error] = useUser()

  React.useEffect(() => {
    if (user) {
      return db.collection('adminUsers').doc(user.uid).onSnapshot(adminUser => {
        if (adminUser.exists) setAdmin(user)
        else setAdmin(false)
      })
    }
  })

  return [admin, loading, error]
}
