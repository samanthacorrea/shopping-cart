import React from 'react';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import helper from '../../config/helper'

const Product = (props) => {
    return (
        <div className="row mt-4" index={props.index}>
            <div className="col-2">
                <img src={props.product.image || asset.NO_IMAGE} alt={props.product.name} width="150" height="200"/>
            </div>
            <div className="col-9 border-bottom">
                <div className="h5"><strong>{props.product.name}</strong></div>
                <div className="mt-n2">por <i>{props.product.author}</i></div>
                <div className="mt-n2"><i>{props.product.stock_quantity}</i></div>
                <div className="h4">R$ {helper.currency(props.product.price)}</div>
                <div style={{'marginTop': '70px'}}>
                    <Link to={"/products/" + props.product.id}>
                        <Button variant="contained">Mais detalhes</Button>
                    </Link> 
                </div>
            </div>
        </div>
    )
}

export default Product