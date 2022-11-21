import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductsDetail = () => {
    const [detailData,setDetailData]=useState({})
    const {id}=useParams()
    const navigate=useNavigate()

    console.log("id-->",id)
    useEffect(()=>{getDetailData()},[])

    const getDetailData=(()=>{
        axios.get(`http://localhost:3001/products/${id}`)
        .then((res)=>{
            console.log("res from getDetaildata->",res.data)
            setDetailData(res.data)
        })
        .catch((err)=>console.log(err))
    })
    console.log("detailData-->",detailData)
  return (
    <div  >
     <h2>Products Detail</h2>
     <div style={{border:"1px solid black",backgroundColor:"#36454F",color:"white"}}>
      <h1>{detailData.name}</h1>
      <h3>{detailData.price}</h3>
      <h4>{detailData.description}</h4>
     </div>
     <button onClick={()=>navigate("/products")}> View More Products </button>
    </div>
  )
}

export default ProductsDetail