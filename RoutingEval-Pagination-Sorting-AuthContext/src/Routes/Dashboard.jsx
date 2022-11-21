import { useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { AuthContext } from "../Context/AuthContext";
import ProductList from "../Components/ProductList"
import Pagination from "../Components/Pagination";

const getUrl=(url,sortBy,orderBy)=>{
  if(orderBy){
    url=`${url}&orderBy=${orderBy}`
  }
  return url
}


function Dashboard() {
  const {token,logoutUser} =useContext(AuthContext)
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState()
  const [loading,setLoading]=useState(true)
  const sortBy="price"
  const [orderBy,setOrderBy]=useState("asc")
  

  useEffect(()=>{getData()},[page,orderBy])
  const getData=()=>{
    
    let apiUrl=getUrl(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&limit=10`,sortBy,orderBy)
    setLoading(true)
    fetch(apiUrl)
    .then((res)=>res.json())
    .then((res)=>{
      setProducts(res.data)
      setTotalPages(+res.totalPages)
    })
    .catch((err)=>console.log(err))
    .finally(()=>{setLoading(false)})
  }
  
  const handlePageChange=(payload)=>{
    setPage(page+payload)
  }
  

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button data-testid="logout-btn" onClick={logoutUser}>Logout</button>
        <p>
          <b data-testid="user-token">Token:{token}</b>
        </p>
      </div>
      <br />
      <div data-testid ="sort-container">
        <button data-testid="low-to-high" disabled={orderBy==="asc"} onClick={()=>{setOrderBy("asc")}} >Sort low to high</button>
        <button data-testid="high-to-low" disabled={orderBy==="desc"} onClick={()=>{setOrderBy("desc")}} >Sort high to low</button>
      </div>
      <br />
      <div data-testid="pagination-container">
        <Pagination current={page} totalPage={totalPages} handlePageChange={handlePageChange} />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading?<Loader />:<ProductList products={products} />}        
      </div>
   
    </div>
  );
}

export default Dashboard;
