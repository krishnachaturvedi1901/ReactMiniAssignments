
import React, { useEffect,useState } from 'react'
import GroceryItem from './GroceryItem'

const Grocerydetails = () => {
    const [productsArr,setProductsArr]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:3001/data`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log("response",res)
            setProductsArr(res)
        })
        .catch((err)=>console.log("Errorrr",err))
    },[])
  return (
    <div style={{ textAlign:"center"}} >
     <h1 style={{border:"2px solid #3B3486",backgroundColor:"#5DA7DB",width:"100%", padding:"8px",borderRadius:"6px" }} >Groceries</h1>
     <div data-cy= "container" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"20px",width:"max-content",margin:"auto"}} >
      {
        productsArr.map((item)=>{
          return <GroceryItem key={item.id} {...item} />
        })
      }
     </div>
    </div>
  )
}

export default Grocerydetails