import React, { useRef, useState } from 'react'
import classes from './AddedExpenseItem.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { themeState } from '../store/theme-reducer';
import { expenseStates } from '../store/expenses-state';
import Papa from 'papaparse';

const AddedExpenseItem = (props) => {
  const expenses=props.item;
  // console.log("expenses = ", expenses)
  const idToken = useSelector(state=>state.auth.token)
  const userID = useSelector(state=>state.auth.userId)
  // console.log("userId",userID)

  const ExpensesList=[];
  for(let key in expenses){
    const description=expenses[key].description;
    const category=expenses[key].category;
    const amount=expenses[key].amount;
    let obj={
      id: key,
      description,
      category,
      amount
    }
    // console.log(obj)
    ExpensesList.push(obj)
  }
  console.log("ExpensesList = ",ExpensesList)

  const dispatch = useDispatch();
  const [updated, setupdated] = useState(false);
  const [itemId, setitemId] = useState(null);
  const [activate, setActivate] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  console.log(isDarkMode)
  const updatedAmountRef=useRef();
  const updateCategoryRef=useRef();
  const updatedDescriptionRef=useRef();


  const handleEdit=(id)=>{
    // console.log(id)
    setupdated(!updated)
    setitemId(id)
  }

  const handleUpdateSubmit=async(e)=>{
    e.preventDefault()
    console.log(itemId)
    const response=await fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/users/${userID}/expenses/${itemId}.json?auth=${idToken}`,{
      method:'PUT',
      body: JSON.stringify({
        amount:updatedAmountRef.current.value,
        description:updatedDescriptionRef.current.value,
        category:updateCategoryRef.current.value,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(response.ok){
      console.log("updated Successfully")
      const data=await response.json()
      console.log("data",data)
      dispatch(expenseStates.addNewExpense({key:itemId , value:data}))
      // props.setupdated(!updated)

    }
    setupdated(!updated)
   
  }

  const handleDelete=async(id)=>{
    console.log(id)
   const response=await fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/users/${userID}/expenses/${id}.json?auth=${idToken}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(response.ok){
      console.log("deleted successfully") 
      dispatch(expenseStates.deleteExpense(id))
    }
    setIsDeleted(!isDeleted)
  }

  let sum=0;
  ExpensesList.forEach((item)=>{
    sum+=+item.amount
  })

  const convertObjectToCSV=(data)=>{
    const arr=[];
    console.log(data)
    arr.push(["amount", "category", "description"]);

    for (const name in data) {
      const row = [];
      // row.push(name);
      row.push(data[name].amount);
      row.push(data[name].category);
      row.push(data[name].description)
      arr.push(row);
    }
     return arr
    }
  
  const downloadCsv=(filename, data)=>{
    const csv = Papa.unparse(data);
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.setAttribute('href', csvUrl);
    link.setAttribute('download', filename);
    link.click();
  }

  const activateHandler=()=>{
    setActivate(!activate)
  }

  const activatePremiumHandler=(e)=>{
    e.preventDefault()
    console.log("premium handler activated")
    dispatch(themeState.toggleTheme());
  }
  const downloadFileHandler=()=>{
    const csvData = convertObjectToCSV(props.item);
    downloadCsv('myExpense.csv', csvData);
  }

  return (

    <div className={`${isDarkMode?classes.darktheme:classes.expenseItem}`}>
      {sum>10000?<button onClick={activateHandler} >Activate Premium</button>:""}
    {activate && <div>
     {<button onClick={activatePremiumHandler}>Chnage theme</button>}
     {<button onClick={downloadFileHandler}>Download File</button>}
     </div>}
     <div className={classes.headings}>
      <p>Price</p>
      <p >Description</p>
      <p>Category</p>
     </div>
     
      {ExpensesList.map((ele)=>{
      
        return(
            <div key={ele.id} className={classes.expenseItemItem}>
                  
                <p>{ele.amount}</p>
                <p style={{width:"200px"}}>{ele.description}</p>
                <p>{ele.category}</p>
              <div  className={classes.btnDiv}>
                 <button className='btn btn-info' onClick={()=>{handleEdit(ele.id)}}>Edit</button>
                <button className='btn btn-danger' onClick={()=>{handleDelete(ele.id)}}>Delete</button></div>
            </div>
        )
    
      })}
      
      <p>total={sum}</p>
   {updated && <form action="" className={classes.updatedForm}>
        <h1>Enter the updated values here</h1>
        <label htmlFor="">Amount</label>
        <input type="number"  ref={updatedAmountRef}/>
        <label htmlFor="">Description</label>
        <input type="text" ref={updatedDescriptionRef}/>
        <label htmlFor="">Category</label>
        <input type="text" ref={updateCategoryRef} />
        <button className='btn btn-success' onClick={handleUpdateSubmit}>Submit</button>
      </form>}
    </div>
  )
}

export default AddedExpenseItem
