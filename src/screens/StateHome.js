import React from 'react'
import PageTitle from '../PageTitle'
import ColumnLeft from '../ColumnLeft'
import ColumnRight from '../ColumnRight'
import Leader from '../Leader'

const today = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date()
  return date.toLocaleDateString("en-US", options)
}

const StateHome = ({ match }) =>

  <div className="row">
    <div className="span9">
      <PageTitle />
      <div className="row">
        <div className="span3">
          <ColumnLeft />
        </div>
        <div className="span6">
          <h2 className="state-header">Leaders Being Prayed For Today</h2>
          <h3 className="date">{today()}</h3>
          <Leader />
          <Leader />
          <Leader />
        </div>
      </div>
    </div>

    <div className="span3" style={{ padding: 0.25 }}>
      <ColumnRight />
    </div>
  </div>

export default StateHome
