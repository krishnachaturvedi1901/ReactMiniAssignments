import axios from 'axios'
import { useEffect, useState } from 'react'

const getUrl=(url,sortBy,orderBy,filterBy,filterType)=>{
  if(sortBy&&orderBy&&filterBy&&filterType){
    url=`${url}&_sort=${sortBy}&_order=${orderBy}&${filterBy}=${filterType}`
  }
  else if(sortBy&&orderBy){
    url=`${url}&_sort=${sortBy}&_order=${orderBy}`
  }
  else if(filterBy&&filterType){
    url=`${url}&${filterBy}=${filterType}`
  }
  return url
}

const DisplayForm = () => {
  const [fetchAfterDelete,setFetchAFterDelete]=useState()
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const [lastPage,setLastPage]=useState()
  const [orderBy,setOrderBy]=useState()
  const [filterType,setFilterType]=useState()
  const sortBy="salary"
  const filterBy="department"
  const perPage=5
  
// useEffect(()=>{getData()},[])

useEffect(()=>{

    let apiUrl=getUrl(`http://localhost:3001/employee?_page=${page}&_limit=${perPage}`,sortBy,orderBy,filterBy,filterType)

    axios.get(apiUrl)
    .then((res)=>{
        console.log("resp after get",res)
        setData([...res.data])
        let lastPageNo=Math.ceil(+res.headers["x-total-count"]/perPage)
        console.log("lastPageNo-->",lastPageNo)
        setLastPage(lastPageNo)
        setFetchAFterDelete(false)
      })
    .catch((err)=>{
        console.log(err)
    })
  

},[page,filterBy,orderBy,filterType,sortBy,fetchAfterDelete])

  // console.log("datat-->",data)

  const handleChange=(e)=>{
    const { name, value } = e.target;
    name=="department"?setFilterType(value):setOrderBy(value)
  }
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3001/employee/${id}`)
    .then(()=>{setFetchAFterDelete(true)})
    .catch((err)=>{console.log("afterDelete",err)})

  }

  return (
    <div>
     
      <h1>Display Employees Data</h1> 
      <div>
       <fieldset>
          <legend>Filter Employee</legend>
          <div>
            <label>Department:</label>
            <select
          name="department"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value="">Sort by department</option>
          <option value="web developer">Web developer</option>
          <option value="app developer">App developer</option>
          <option value="data analyst">Data analyst</option>
            </select>
          </div>
          <div>
            <label>Salary</label>
            <select name="salary"
              onChange={(e) => {
              handleChange(e);
            }} >
             <option value="" >Sort by salary</option>
             <option value="asc" >Low to high</option>
             <option value="desc" >High to low</option>
            </select>
          </div>
       </fieldset>
      </div>
      <div>
        <table>
        <thead>
         <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Marital Status</th>
          <th>Age</th>
          <th>Salary</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Delete</th>
         </tr>
        </thead>
        <tbody>
        {
          data.map((ele)=>{
            return(
              <tr key={ele.id} >
               <td>{ele.name}</td>
               <td>{ele.department}</td>
               <td>{ele.maritalStatus}</td>
               <td>{ele.age}</td>
               <td>{ele.salary}</td>
               <td>{ele.gender}</td>
               <td>{ele.address}</td>
               <td onClick={()=>{handleDelete(ele.id)}} style={{cursor:"pointer"}} >Delete</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      </div>
      <div>
       <button onClick={()=>{setPage(page-1)}} disabled={page===1} >Prev</button>
       <button>{page}</button>
       <button onClick={()=>{setPage(page+1)}} disabled={page===lastPage} >Next</button>
      </div>
    </div>
  )
}

export default DisplayForm