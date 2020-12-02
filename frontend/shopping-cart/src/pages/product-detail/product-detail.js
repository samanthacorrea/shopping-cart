import React from 'react';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import helper from '../../config/helper'

const ProductDetail = (props) => {    
    return (

        <div className="row mt-5">
        
            <div className="col-3">
                <img src={props.product.image || asset.NO_IMAGE} alt={props.product.name} width="250" height="350"/>
            </div>
            
            <div className="col-7">
                <div className="h5"><strong>{props.product.name}</strong></div>
                <div className="mt-n1">por <i>{props.product.author}</i></div>
                <div className="mt-3">{props.product.description}</div>
            </div>

            <div className="col-2 text-right">
                <div className="h4">R$ {helper.currency(props.product.price)}</div>
                <div className="mt-n2 mb-3">{props.product.stock_quantity>0?'Em estoque':'Produto indisponível'}</div>
                <div className="mt-n2 mb-3">{props.product.stock_quantity}</div>
                <div>
                    <Button variant="contained" color="primary" size="large" disableElevation onClick={() => props.saveProduct(props.product)}>
                        <strong>Comprar</strong>
                    </Button>
                </div>
            </div>
        </div> 
        
    )
}

export default ProductDetail