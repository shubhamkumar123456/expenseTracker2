import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import classes from './ForegetPassword.module.css'

const ForgetPassword = () => {

    const emailRef=useRef()

    const handleClick=async(e)=>{
        e.preventDefault();
     try {
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLkoEIUdeBt-N8rc118amjIyeboq9E9GA',{
            method: 'POST',
            body: JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:emailRef.current.value
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            const data=await response.json();
            console.log(data)
        }else{
            const data=await response.json()
            // console.log(data.error.message)
            alert(data.error.message)
        }
     } catch (error) {
        console.log(error)
     }

    }

  return (
    <div className={classes.forgetPassword}>
      <label htmlFor="">Enter the Email which you have registered</label>
      <input type="text" placeholder='Email' ref={emailRef} />
      <button onClick={handleClick}>Send Link</button>
   <p>Already a user?<Link to='/login'>Login</Link></p>
    </div>
  )
}

export default ForgetPassword
