function Pagination({current ,totalPage ,handlePageChange}) {
  const prev = <button  data-testid="prev-page" disabled={current===1} onClick={()=>{handlePageChange(-1)}} >PREV</button>;
  const currentPage = <button data-testid="current-page">{current}</button>;
  const next = <button  data-testid="next-page" disabled={current===totalPage} onClick={()=>{handlePageChange(1)}}>NEXT</button>;
  const totalPagesElem = (
    <div>
      Total Pages: <b data-testid="total-pages">{totalPage}</b>{" "}
    </div>
  );
  return (
    <div data-testid="pagination-container">
      {prev}
      {currentPage}
      {next}
      {totalPagesElem}
    </div>
  );
}

export default Pagination;
