import React from 'react'
import  { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import ProductsDetail from '../Pages/ProductsDetail'


const AllRoutes = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>} ></Route>
     <Route path='/products' element={<Products/>} ></Route>
     <Route path='/products/:id' element={<ProductsDetail/>} ></Route>
    </Routes>
  )
}

export default AllRoutes