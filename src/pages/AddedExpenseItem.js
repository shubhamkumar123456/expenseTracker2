import React, { useRef, useState } from 'react'
import classes from './AddedExpenseItem.module.css'

const AddedExpenseItem = (props) => {

  const [updated, setupdated] = useState(false);
  const [itemId, setitemId] = useState(null);

  const updatedAmountRef=useRef();
  const updateCategoryRef=useRef();
  const updatedDescriptionRef=useRef();


  const handleEdit=(id)=>{
    // console.log(id)
    setupdated(true)
    setitemId(id)
  }

  const handleUpdateSubmit=async(e)=>{
    e.preventDefault()
    console.log(itemId)
    const response=fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/expenseItems/${itemId}.json`,{
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
    }


    setupdated(false)

  }

  const handleDelete=async(id)=>{
    console.log(id)
   const response=await fetch(`https://expense-tracker-c65c2-default-rtdb.firebaseio.com/expenseItems/${id}.json`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(response.ok){
      console.log("deleted successfully")
      
    }
  }
  return (
    <div className={classes.expenseItem}>
     <div className={classes.headings}>
      <p>Price</p>
      <p >Description</p>
      <p>Category</p>
     </div>
      {props.item.map((ele)=>{
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
