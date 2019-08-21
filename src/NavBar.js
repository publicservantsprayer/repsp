/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <div className="navbar navbar-fixed-top">
    <div className="navbar-inner">
      <div className="container-fluid">
        <a className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </a>

        <Link to="/" className="brand">Public Servants' Prayer</Link>

        <div className="nav-collapse">
          <ul className="nav pull-right">
            <li><Link to="/">Find Your State</Link></li>

            <li><Link to="https://thepsp.org/blog">Blog</Link></li>

            <li><Link to="http://thepsp.org/about">About</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)


export default NavBar
