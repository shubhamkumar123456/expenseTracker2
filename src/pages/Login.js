import React, { useRef } from 'react'
import { Link, redirect,useNavigate } from "react-router-dom";


import classes from './Login.module.css'
import DummyPage from './DummyPage';


const Login = () => {
    const emailRef=useRef()
    const passwordRef=useRef()

    const navigate = useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLkoEIUdeBt-N8rc118amjIyeboq9E9GA',{
                method: 'POST',
                body:JSON.stringify({
                    email:emailRef.current.value,
                    password:passwordRef.current.value,
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
                
            })
            if(response.ok){
                let data=await response.json();
                console.log(data.idToken)
                localStorage.setItem('authToken', data.idToken)
                navigate('/dummypage')
               
            }
            else{
                let data=await response.json();
                // console.log(data.error.message)
                alert(data.error.message) 
            }
        
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className={classes.login} onSubmit={handleSubmit}>
    <form action="" className={classes.form}>
    <h1 className={classes.heading}>Login</h1>
  <label htmlFor="email">Email
  <input type="text" ref={emailRef} /></label>
  <label htmlFor="password">Password
  <input type="password" ref={passwordRef} /></label>
 
<button className={`${classes.btnSignUp} btn btn-primary`} type='submit' >Login</button>
<a style={{textAlign:"center"}}>Forgot Password</a>
    </form>
    <Link to="/signup"><button className={classes.accountbtn}>Don't have an account?SignUp </button></Link>
</div>
  )
}

export default Login
