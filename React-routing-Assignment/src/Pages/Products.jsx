import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import "../App.css"

const defaultStyle={textDecoration:"none",color:"white"}
const activeStyle={textDecoration:"none",color:"yellow"}


const Products = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const [data,setData]=useState([])
    const [searchData,setSearchData]=useState([])
    const [page,setPage]=useState(+searchParams.get("page"))
    const [lastPage,setLastPage]=useState()
    const inputRef=useRef()
    const navigate=useNavigate()
    const perPage=4

    useEffect(()=>{
      if(page===0){
        setSearchParams({page:1})
        setPage(1)
      }
      else{setSearchParams({page})}
      getData()
    },[page])

    console.log("data==>",data)

    const getData=()=>{
      console.log("page===>",page)
        axios.get(` http://localhost:3001/products?_page=${page}&_limit=${perPage}`)
        .then((res)=>{
            console.log("res after axios.get-->",res)
            setData(res.data)
            let totalPage=Math.ceil(+res.headers["x-total-count"]/perPage)
            console.log("totalPage-->",totalPage)
            setLastPage(totalPage)

        })
        .catch((err)=>{console.log("error from axios.get",err)})
    }
    const handleChange=(value)=>{
      console.log("valueInside Search-------->",typeof value,"---->",value,"length==>",value.length)

        if(value!==""&&value!==" "){
            axios.get(`http://localhost:3001/products?q=${value}`)
            .then((res)=>{
             console.log("res after q search",res)
             setSearchData(res.data)
            })
            .catch((err)=>{console.log(err)})     
        }
        else{
            setSearchData([])
        }
    }

    const updateSearchStyle={maxHeight:"300px",position:"absolute",zIndex:2}
    const resetSearchStyle={height:"0px"}
    let styles

    searchData.length!==0?styles=updateSearchStyle:styles=resetSearchStyle

  return (
    <div>
     <h1>Products</h1>
     <div style={{width:"400px",margin:"auto"}} >
      <input  type="text" placeholder="Search" onChange={(e)=>{handleChange(e.target.value)}} style={{width:"400px"}} />
      <div id="searchDiv" style={styles} >
       {searchData.map((ele)=>{
          return(
              <div className='navbarDiv' style={{padding:"0px"}} onClick={()=>navigate(`/products/${ele.id}`)} >
               <h5>{ele.name}</h5>
               <p>{ele.price}</p>
              </div>
          )
        })}
      </div>
     </div>
     <div style={{border:"1px solid #cecece",width:"80%",margin:"40px auto"}} >
      {
         data.map((ele)=>{
          return (
            <div key={ele.id} className="navbarDiv" style={{border:"1px solid #cecece"}} >
             <p>{ele.id}</p>
             <h2>{ele.name}</h2>
             <h3>{ele.price}</h3>
             <NavLink to={`/products/${ele.id}`}
             style={(isActive)=>{
              return isActive?activeStyle:defaultStyle;
             }}
              >
              More Detail...
              </NavLink>
            </div>
            )
         })
      }
     </div>
     <div>
      <button disabled={page===1} onClick={()=>setPage(page-1)} >Prev</button>
      <button>{page}</button>
      <button disabled={page===lastPage} onClick={()=>setPage(page+1)} >Next</button>
     </div>
    </div>
  )
}

export default Products