import React from 'react'
import classnames from "classnames"

const TodoPages = ({page,handlePageChange,finalPage}) => {

    let conditionalStyle=classnames(` ${page===1||page===finalPage?"TodoPageEnds":"TodoPagesDiv"}`)
    console.log("conditionalStyle----",conditionalStyle)

  return (
    <div className={conditionalStyle} >
      <button disabled={page===1} onClick={()=>handlePageChange(-1)} >-</button>
      <button>{page}</button>
      <button disabled={page===finalPage} onClick={()=>handlePageChange(1)} >+</button>

    </div>
  )
}

export default TodoPages