import React, { useEffect, useState } from 'react';
import requester from '../../config/requester'
import Product from './product';

const Products = (props) => {  
    const [products, setProducts] = useState();
  
    useEffect(() => {
    requester.getProducts().then( result => {
          setProducts(result.data.reverse())
      }).catch(error => console.log(error))
    },[]);

    return (
        <div className="container">
            {products&&products.map((product, index) => (
                <Product product={product} index={index}/>
            ))}
              
        </div>
    )
}

export default Products
