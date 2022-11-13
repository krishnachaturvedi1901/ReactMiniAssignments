export default function BookCard({ author,img ,price,title,year}) {
  return (
    <div data-testid='book-card' style={{border:"1px solid #cecece",padding:"10px",boxShadow:"2px 2px 1px #cecece",height:"300px",width:"250px",textAlign:"center"}} >
        <img src={img} alt={"book img"} style={{height:"220px",width:"200px", marginBottom:"10px"}} />
        <b><div data-testid='book-card-title'>{title}<span>({year})</span></div></b>
        <div data-testid='book-card-author'>{author}</div>
        <div data-testid='book-card-price'>{price}</div>
    </div>
  )
}

