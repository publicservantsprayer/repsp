import React from 'react'

const Leader = ({ leader }) => {
  const src = `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
  console.log(leader)
  return (
    <div>
      <h3>{leader.Title} {leader.FirstName} {leader.LastName}</h3>
      {leader.StateCode &&
        <a href={`/states/${leader.StateCode.toLowerCase()}/leader/${leader.permaLink}`}><img src={src} alt={leader.PhotoFile} /></a>
      }
    </div>
  )
}

export default Leader
