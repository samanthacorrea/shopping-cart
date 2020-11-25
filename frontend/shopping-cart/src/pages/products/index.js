import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import helper from '../../config/helper'


const Products = (props) => {  
    const [products, setProducts] = useState();
  
    useEffect(() => {
      helper.getProducts().then( result => {
          setProducts(result.data.reverse())
      }).catch(error => console.log(error))
    },[]);

    
    const currency = (value) => {
      return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2})
    }
    
    return (
        <div className="container">
            {products&&products.map((product, index) => (
                <div className="row mt-4" key={index}>
                    <div className="col-2">
                    <img src={product.image || asset.NO_IMAGE} alt={product.name} width="150" height="200"/>
                    </div>
                    <div className="col-9 border-bottom">
                    <div><strong>{product.name}</strong></div>
                    <div>por {product.author}</div>
                    <div className="h4">R$ {currency(product.price)}</div>
                    <div style={{'marginTop': '80px'}}>
                        <Link to={"/products/" + product.id}>
                            <Button variant="contained">Mais detalhes</Button>
                        </Link> 
                    </div>
                    </div>
                </div> 
            ))}
              
        </div>
    )
}

export default Products
