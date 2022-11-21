import React from "react";
import ProductItem from "./ProductItem";

// create Product component which contains the list of ProductItem component
const ProductList = ({products}) => {
  return (
    <div data-testid="products-container">
       {products.map((ele) => {
         return (<ProductItem key={ele.id} title={ele.title} price={ele.price} category={ele.category} image={ele.image} />)
       })}
    </div>
    )
};

// export
export default ProductList;
