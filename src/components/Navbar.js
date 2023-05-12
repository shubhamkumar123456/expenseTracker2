import React from 'react'
import classes from './Navbar.module.css'
const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <ul>
        <li>ExpenseTracker</li>
        <li>Home</li>
        <li>Products</li>
        <li>AboutUs</li>
      </ul>
    </div>
  )
}

export default Navbar
