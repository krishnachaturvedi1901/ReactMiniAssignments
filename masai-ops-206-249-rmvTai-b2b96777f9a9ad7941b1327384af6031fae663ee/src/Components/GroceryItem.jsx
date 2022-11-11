
import React, { useState } from 'react'
import CartButton from './CartButton'

const GroceryItem = ({discount,imgURL,title,mrp,sellingPrice}) => {
    const [itemCount,setItemCount]=useState(0)
  const handleChange=(payload)=>{
    setItemCount(itemCount+payload)
  }

  return (
    <div className = "grocery_card" style={{border:"1px solid #3B3486",borderRadius:"4px", width:"250px",height:"max-content"}} >
     <div style={{ width:"auto",backgroundColor:"pink",padding:"4px",marginBottom:"6px"}}><b>Discount:</b>{discount}</div>
     <img src={imgURL} alt="itemImg"  style={{height:"150px"}} />
     <h4>{title}</h4>
     <h5>{sellingPrice+" "}<label style={{textDecoration:"line-through",fontWeight:"normal"}} ><span>{" "}MRP:</span>{mrp}</label></h5>
     {
        itemCount===0?<button data-cy="add_to_cart" 
          onClick={()=>setItemCount(itemCount+1)}
          style={{border:"1px solid #3B3486",borderRadius:"2px", width:"100%",backgroundColor:"#5DA7DB",padding:"8px",fontWeight:"bold",cursor:"pointer"}}
          >ADD TO CART</button>:
          <CartButton itemCount={itemCount} handleChange={handleChange} />
     }
    </div>
  )
}

export default GroceryItem