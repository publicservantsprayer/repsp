import React from 'react'

const Chamber = ({ title, leaders }) => {
  leaders = leaders.map(doc => doc.data())
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {leaders.map(leader =>
          <li key={leader.PID}>

            <img src={`https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`} alt={leader.PhotoFile} />
            <br />
            {leader.FirstName} {leader.LastName}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Chamber
