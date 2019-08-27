import React from 'react'

const Firebase = React.createContext(null)

export const withFirebase = Component => props => (
  <Firebase.Consumer>
    {db => <Component {...props} db={db} />}
  </Firebase.Consumer>
)

export default Firebase
