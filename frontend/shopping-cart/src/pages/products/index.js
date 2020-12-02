import React, { useEffect, useState } from 'react';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import requester from '../../config/requester'
import helper from '../../config/helper'
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
