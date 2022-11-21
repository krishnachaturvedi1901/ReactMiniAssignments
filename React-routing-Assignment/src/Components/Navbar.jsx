import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "../App.css"

const Links=[
    {
        path:"/",
        title:"Home",
    },
    {
        path:"/products",
        title:"Products",
    },
]

const Navbar = () => {

  const defaultStyle={textDecoration:"none",color:"white"}
  const activeStyle={textDecoration:"none",color:"yellow"}

  return (
    <div className="navbarDiv" >
     {
        Links.map((link)=>{
            return (<NavLink key={link.path} to={link.path}
              style={(isActive)=>{
                return isActive?activeStyle:defaultStyle;
              }}
              >
              {link.title}
              </NavLink>)
        })
     }
    </div>
  )
}

export default Navbar