import React from 'react'
import classes from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate =useNavigate()
  const handleLogout=(e)=>{
    e.preventDefault();
    navigate('/login')
    localStorage.removeItem('auth_token')
  }

  return (
    <div className={classes.navbar}>
      <ul>
        <li>ExpenseTracker</li>
        <li>Home</li>
        <li>Products</li>
        <li>AboutUs</li>
      </ul>
      <button onClick={handleLogout} className={classes.logout}>Logout</button>
    </div>
  )
}

export default Navbar
