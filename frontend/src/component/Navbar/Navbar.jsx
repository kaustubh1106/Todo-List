import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className="navbar-heading">To Do.</h1>
      <div className="navbar-links">
       <Link to = "/login" >Login</Link>
       <Link to = "/signup" >SignUp</Link>
      </div>
    </div>
  )
}

export default Navbar
