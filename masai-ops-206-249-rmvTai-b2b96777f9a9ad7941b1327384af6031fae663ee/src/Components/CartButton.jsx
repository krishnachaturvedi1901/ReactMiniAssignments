
import React from 'react'

const CartButton = ({itemCount,handleChange}) => {
  return (
    <div className = "change_quantity_container"
    style={{width:"100%",fontWeight:"bold",display:"flex",justifyContent:"flex-end"}}
    >
      <button data-cy = "dec_btn" onClick={()=>handleChange(-1)}
      style={{border:"1px solid #3B3486",borderRadius:"50%",backgroundColor:"#5DA7DB",padding:"8px",cursor:"pointer",fontWeight:"bolder",margin:"8px"}}
      >-</button>
      <p className="quantity">{itemCount}</p>
      <button data-cy = "inc_btn" onClick={()=>handleChange(1)} 
      style={{border:"1px solid #3B3486",borderRadius:"50%",backgroundColor:"#5DA7DB",padding:"8px",cursor:"pointer",fontWeight:"bolder",margin:"8px"}}
      >+</button>
    </div>
  )
}

export default CartButton