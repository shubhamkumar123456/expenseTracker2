import React from 'react'
import classes from './AddedExpenseItem.module.css'
const AddedExpenseItem = (props) => {
  return (
    <div className={classes.expenseItem}>
     <div className={classes.headings}>
      <p>Price</p>
      <p>Description</p>
      <p>Category</p>
     </div>
      {props.item.map((ele)=>{
        return(
            <div key={ele.id} className={classes.expenseItemItem}>
                <p>{ele.amount}</p>
                <p>{ele.description}</p>
                <p>{ele.category}</p>
            </div>
        )
      })}
    </div>
  )
}

export default AddedExpenseItem
