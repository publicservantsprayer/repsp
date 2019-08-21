import React from 'react'

import PageTitle from '../PageTitle'
import ColumnLeft from '../ColumnLeft'
import ColumnRight from '../ColumnRight'

const today = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date()
  return date.toLocaleDateString("en-US", options)
}

const StateLeaders = () =>
  <div className="row">
    <div className="span9">
      <PageTitle />
      <div className="row">
        <div className="span3">
          <ColumnLeft />
        </div>
        <div className="span6">
          <div className="row-fluid">
            <h2>U.S. Senate</h2>
            <p>... 2 guys</p>
            <h2>U.S. House</h2>
            <p>... A bunch of guys and gals</p>
            <h2>State Senate</h2>
            <p>... Many guys and gals</p>
            <h2>State House</h2>
            <p>... Many guys and gals</p>
          </div>
        </div>
      </div>
    </div>

    <div className="span3" style={{ padding: 0.25 }}>
      <ColumnRight />
    </div>
  </div>

export default StateLeaders
