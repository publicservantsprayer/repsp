import React from 'react'

const Firebase = React.createContext(null)

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

export default Firebase
