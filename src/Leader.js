import React from 'react'

const Leader = props => {
  console.log(props)
  const leader = props.leader || {}
  const src = `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
  return (
    <div>
      <h3>{leader.Title} {leader.FirstName} {leader.LastName}</h3>
      <img src={src} alt={leader.PhotoFile} />
    </div>
  )
}

export default Leader
