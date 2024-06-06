import React from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import useUSAState from './useUSAState'

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
    functions: firebase.functions(),
  }
}

export const useContentCollection = category => {
  const { db } = useFirebase()
  const [docs, loading, error] = useCollectionData(
    db
      .collection('content')
      .where('category', '==', category)
      .orderBy('createdOn', 'desc')
      .limit(4),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error loading content collection: ', error)

  return [docs, loading, error]
}

export const useOtherTwitterAccounts = category => {
  const { db } = useFirebase()
  const [docs, loading, error] = useCollectionData(
    db.collection('twitterAccounts').where('stateAccount', '==', false),
    {
      idField: 'accountName',
    }
  )
  if (error) console.log('Error loading other twitter accounts: ', error)

  return [docs, loading, error]
}

export const useStateTwitterAccounts = category => {
  const { db } = useFirebase()
  const [docs, loading, error] = useCollectionData(
    db.collection('twitterAccounts').where('stateAccount', '==', true).orderBy('stateCode'),
    {
      idField: 'accountName',
    }
  )
  if (error) console.log('Error loading state twitter accounts: ', error)

  return [docs, loading, error]
}

export const useContentItem = docId => {
  const { db } = useFirebase()
  const [doc, loading, error] = useDocumentData(db.collection('content').doc(docId), {
    idField: 'docId',
  })
  if (error) console.log('Error getting content item: ', docId, error)

  return [doc, loading, error]
}

export const useHistoricalPost = (year, month, day) => {
  const { db } = useFirebase()
  const { stateCode } = useUSAState()

  const [post, loading, error] = useDocumentData(
    db.doc(`/states/${stateCode}/posts/${year}-${month}-${day}`)
  )

  if (error) console.log('Error loading historical post: ', error)

  return [post, loading, error]
}

export const useLatestPost = () => {
  const { db } = useFirebase()
  const { stateCode } = useUSAState()

  const [posts, loading, error] = useCollectionData(
    db.collection(`/states/${stateCode}/posts/`).orderBy('dateID', 'desc').limit(1)
  )

  if (error) console.log('Error loading latest post: ', error)

  if (Array.isArray(posts)) return [posts[0], loading, error]
  else return [false, loading, error]
}

export const useStateLeaders = ({ legType, chamber }) => {
  const { db } = useFirebase()
  const { stateCode } = useUSAState()
  const [leaders, setLeaders] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const results = await db
          .collection(`/states/${stateCode}/leaders/`)
          .where('LegType', '==', legType)
          .where('Chamber', '==', chamber)
          .get()
        console.log({ results })
        setLeaders(results.docs.map(leader => leader.data()))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    loadData()
  }, [chamber, db, legType, stateCode])

  if (error) console.log('Error loading latest post: ', error)

  return [leaders, loading, error]
}

export const useDataImports = () => {
  const { db } = useFirebase()
  let [dataImports, loading, error] = useCollectionData(db.collection(`/dataImports`), {
    idField: 'docId',
  })

  if (error) console.log('Error loading dataImports: ', error)

  console.log(dataImports)

  return [dataImports, loading, error]
}

export const useSiteConfig = () => {
  const { db } = useFirebase()
  const [doc, loading, error] = useDocumentData(db.collection('siteConfig').doc('dataImports'), {
    idField: 'docId',
  })
  if (error) console.log('Error getting site config: ', error)

  return [doc, loading, error]
}

export const useUser = () => {
  const { auth } = useFirebase()
  const [user, loading, error] = useAuthState(auth)

  if (error) console.log('Error loading user: ', error)

  return [user, loading, error]
}

export const useUserProfile = () => {
  const [profile, setProfile] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState()
  const { db } = useFirebase()
  const [user] = useUser()

  React.useEffect(() => {
    if (user) {
      try {
        return db
          .collection('userProfiles')
          .doc(user.uid)
          .onSnapshot(userProfile => {
            if (userProfile.exists) {
              setProfile({ ...userProfile.data(), user: user })
            } else {
              setProfile(false)
            }
            setLoading(false)
          })
      } catch (error) {
        setError(error)
      }
    } else {
      setProfile(false)
    }
  }, [db, user])

  if (error) console.log('Error loading userProfile: ', error)

  return [profile, loading, error]
}

export const useAdmin = () => {
  const [admin, setAdmin] = React.useState()
  const { db } = useFirebase()
  const [user, loading, error] = useUser()

  React.useEffect(() => {
    if (user) {
      return db
        .collection('adminUsers')
        .doc(user.uid)
        .onSnapshot(adminUser => {
          if (adminUser.exists) setAdmin(user)
          else setAdmin(false)
        })
    } else {
      setAdmin(false)
    }
  }, [db, user])

  return [admin, loading, error]
}

export const useHttpsCallable = (functionName, data) => {
  const [result, setResult] = React.useState()
  const [error, setError] = React.useState()
  const { functions } = useFirebase()
  const func = functions.httpsCallable(functionName)

  React.useEffect(() => {
    const callFunction = async () => {
      try {
        const result = await func(data)
        setResult(result)
      } catch (error) {
        console.log('Error calling httpsCallable', error)
        setError(error)
      }
    }
    callFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [result, error]
}

export const useHttpsCallableFunction = functionName => {
  const { functions } = useFirebase()
  return functions.httpsCallable(functionName)
}
