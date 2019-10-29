import React from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'

export default ({ children }) => {
  return (<>
    <NavBar />
    {children}
    <Footer />
  </>)
}
