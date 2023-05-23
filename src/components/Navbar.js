import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {authActions} from  '../store/auth'
import classes from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch=useDispatch()
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  const navigate =useNavigate()

  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch(authActions.logout())
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
     { isAuth && <button onClick={handleLogout} className={classes.logout}>Logout</button>}
    </div>
  )
}

export default Navbar
