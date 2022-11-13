import { useEffect, useState } from "react"
import BookCard from "./BookCard"

export default function NonFiction() {
  const [nonfictionArr,setNonFictionArr]=useState([])

 useEffect(()=>{
  fetch(`http://localhost:3002/nonfiction`)
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
    setNonFictionArr(res)
  })
  .catch((err)=>console.log(err))
 },[])


  return (
    <div data-testid='books-nonfiction' style={{width:"max-content",margin:"auto"}}>
      <h1 data-testid='books-container-title'>{"Non-Fiction Books"}</h1>

      <div className="books-container" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"20px" }} >
      {nonfictionArr.map((book)=>{
        return <BookCard key={book.year} {...book} />
      })}

      </div>
    </div>
  );
}
