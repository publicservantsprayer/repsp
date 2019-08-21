import React from 'react'

import Map from '../Map'
import ColumnRight from '../ColumnRight'

const USMap = () =>
  <div className="row">
    <div className="span9">
      <h1 className="page-header">Find Your State</h1>
      <div className="row">
        <Map />
      </div>
    </div>

    <div className="span3" style={{ padding: 0.25 }}>
      <ColumnRight />
    </div>
  </div>

export default USMap
