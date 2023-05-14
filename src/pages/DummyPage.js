import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './DummyPage.module.css'


const DummyPage = () => {
  const fullNameRef=useRef();
  const profilePhotoUrl=useRef()
  const navigate=useNavigate()
  const ID_TOKEN= localStorage.getItem('authToken')
  console.log(ID_TOKEN)

  const [showForm, setshowForm] = useState(false);
  const [getUserName, setgetUserName] = useState("");
  const [getPicUrl, setgetPicUrl] = useState("");

  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLkoEIUdeBt-N8rc118amjIyeboq9E9GA',{
        method: 'POST',
        body: JSON.stringify({
        "idToken":ID_TOKEN,
        })
      })
    
      const data=await response.json();
      console.log(data.users[0].displayName);
      console.log(data.users[0].photoUrl);
      const getDisplayName=data.users[0].displayName;
      setgetUserName(getDisplayName)
      const getPhotoUrl=data.users[0].photoUrl;
      setgetPicUrl(getPhotoUrl)
    }
    fetchData()
  },[])


  const handleClick=(e)=>{
    e.preventDefault()
    setshowForm(!showForm)
    // navigate('/')
  }
  const handleUpdateClick=async(e)=>{
    e.preventDefault();
  try {
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLkoEIUdeBt-N8rc118amjIyeboq9E9GA',{
      method: 'POST',
      body: JSON.stringify({
        "idToken":ID_TOKEN,"displayName":fullNameRef.current.value,"photoUrl":profilePhotoUrl.current.value,"returnSecureToken":true,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
      
      
    })
    const data=await response.json();
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
     

}
  return (
    <div className={classes.dummyPage}>
     <h2> Welcome to Expense Tracker!!!</h2>
    <p> your profile is Incomplete<button onClick={handleClick}>Complete now</button></p>
   {showForm && <form className={classes.form}>
        <h1>Contact Details</h1>
        <label htmlFor="">Full Name
      <input type="text" ref={fullNameRef} value={getUserName} /></label>
      <label htmlFor="">Profile Photo URL
      <input type="text"  ref={profilePhotoUrl} value={getPicUrl}/></label>
      <button style={{color:"red", background:"white", border:"2px solid red",borderRadius:"5px"}}>Cancel</button>
      <br />
      <button className={`btn btn-danger ${classes.btnUpdate}`} onClick={handleUpdateClick}>update</button>
      
    </form>}
    </div>
  )
}

export default DummyPage
