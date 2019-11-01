import React from 'react'

import Leader from './Leader'

export default function Chamber({ title, leaders }) {
  leaders = leaders.map(doc => doc.data())
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {leaders.map(leader => (
          <li key={leader.PID}>
            <Leader leader={leader} />
          </li>
        ))}
      </ul>
    </div>
  )
}
