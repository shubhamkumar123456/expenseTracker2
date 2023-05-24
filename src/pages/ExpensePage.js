import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpensePage.module.css";
import AddedExpenseItem from "./AddedExpenseItem";
import { useSelector, useDispatch } from 'react-redux';
import { expenseStates } from "../store/expenses-state";




const ExpensePage = () => {

  const dispatch=useDispatch()
  // const expenseList = useSelector(state => state.expense.expenseList)
  const expenseList = useSelector(state => state.expense.expenseList)
  // console.log("expenseList = ",expenseList)
  const idToken = useSelector(state=>state.auth.token)
  const userID = useSelector(state=>state.auth.userId)
  // console.log("idToken",idToken);
  // console.log("userId",userID);
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();
    const idRef=useRef()

    const [item, setitem] = useState([]);
    const [updated, setupdated] = useState(false);

    const fetchData=async()=>{
        const response=await fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`,{
          method: 'GET',
        });
        const data=await response.json();
        console.log(data)
        let arr=[];
        for(let key in data) {
          // console.log(key, data[key]);
          // console.log(key);
          let newobj={
            id:key,
            amount:data[key].amount,
            category:data[key].category,
            description:data[key].description
          }
          arr.push(newobj);
        }
        // console.log(data)
        console.log(arr)
        dispatch(expenseStates.setExpenseList(data));
        setitem(arr)
       
      }

    useEffect(()=>{
      
      fetchData();
    
    },[])

const handlesubmit=async(e)=>{
    e.preventDefault();
    let obj={
        id:idRef.current.value,
        amount:amountRef.current.value,
        description:descriptionRef.current.value,
        category:categoryRef.current.value
    }
  
  try {
    const response=await fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`,{
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data=await response.json();
    // console.log("dataName",data.name);
    dispatch(expenseStates.addNewExpense({key:data.name , value:obj}))
  } catch (error) {
    console.log(error);
  }

  setitem([...item,obj])
}

  return (
    <div>
      <form className={classes.expensePageForm} action="" onSubmit={handlesubmit}>
        <label htmlFor="id">S.no</label>
        <input type="number" ref={idRef} className={classes.idInput}/>
        <label htmlFor="amount">Amount</label>
        <input type="number" placeholder="enter the price you spent" ref={amountRef}/>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="enter the description where you spent the money"
          ref={descriptionRef}
        />
        <label htmlFor="amount">Category</label>
        <input type="text" placeholder="enter the category" ref={categoryRef}/>
        <button className={classes.expensePageSubmitBtn}  type="submit" >
          Submit
        </button>
      </form>
      <AddedExpenseItem item={expenseList} fetchData={fetchData} />
    </div>
  );
};

export default ExpensePage;
