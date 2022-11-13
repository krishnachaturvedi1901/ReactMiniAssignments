import { useEffect,useState } from "react";
import BookCard from "./BookCard";

export default function Fiction() {
  const [fictionArr,setFictionArr]=useState([])

 useEffect(()=>{
  fetch(`http://localhost:3001/fiction`)
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res)
    setFictionArr(res)
  })
  .catch((err)=>console.log(err))
 },[])

  return (
    <div data-testid='books-fiction' style={{width:"max-content",margin:"auto"}}>
      <h1 data-testid='books-container-title'>{"Fictional Books"}</h1>

      <div className="books-container" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"20px" }} >
        {fictionArr.map((book)=>{
          return <BookCard key={book.year} {...book} />
        })}
      </div>
    </div>
  );
}
