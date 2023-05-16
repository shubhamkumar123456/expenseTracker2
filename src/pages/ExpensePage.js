import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpensePage.module.css";
import AddedExpenseItem from "./AddedExpenseItem";


const ExpensePage = () => {
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef=useRef();
    const idRef=useRef()

    const [item, setitem] = useState([]);

    useEffect(()=>{
      const fetchData=async()=>{
        const response=await fetch('https://expense-tracker-c65c2-default-rtdb.firebaseio.com/expenseItems.json',{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data=await response.json();
        // console.log(data)
        let arr=[];
        for(let key in data) {
          // console.log(key, data[key]);
          arr.push(data[key]);
        }
        // console.log(data)
        setitem(arr)
      }
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
    // console.log(obj);
  try {
    const response=await fetch('https://expense-tracker-c65c2-default-rtdb.firebaseio.com/expenseItems.json',{
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data=await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  setitem([...item,obj])
}
// console.log(item)

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
      <AddedExpenseItem item={item} />
    </div>
  );
};

export default ExpensePage;
