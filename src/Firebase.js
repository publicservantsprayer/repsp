import React, { useContext } from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'

const Firebase = React.createContext(null)

export const FirebaseProvider = Firebase.Provider

export const withFirebase = Component => props => (
  <Firebase.Consumer>
    {firebase =>
      <Component
        {...props}
        firebase={firebase}
        db={firebase.firestore()}
        storage={firebase.storage()}
        storageRef={firebase.storage().ref()} />}
  </Firebase.Consumer>
)

export const useFirebase = () => {
  const firebase = useContext(Firebase)
  return {
    firebase: firebase,
    db: firebase.firestore(),
    storage: firebase.storage(),
    storageRef: firebase.storage().ref()
  }
}

export const useContentCollection = (category) => {
  const { db } = useFirebase()
  const [docs, loading, error] = useCollectionData(
    db
      .collection('content')
      .where('category', '==', category)
      .orderBy('createdOn'),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error loading news: ', error)

  return [docs, loading, error]
}

export const useContentItem = (docId) => {
  const params = useParams()
  const { db } = useFirebase()
  const [doc, loading, error] = useDocumentData(
    db.collection('content').doc(docId || params.docId)
  )
  if (error) console.log('Error getting content item: ', (docId || params.docId), error)

  return [doc, loading, error]
}

export default Firebase
