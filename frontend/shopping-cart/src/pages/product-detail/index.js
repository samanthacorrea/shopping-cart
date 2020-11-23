import React from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';



const Product = (props) => {    

    //let currentProduct = JSON.parse(localStorage.getItem('@library/currentProduct'));
    console.log(props.product)

    return (
        <div className="container">      
            <div className="row mt-5">
                
                <div className="col-3">
                    <img src={props.product.image || asset.NO_IMAGE} alt={props.product.name} width="250" height="350"/>
                </div>
                
                <div className="col-7">
                    <div className="h5"><strong>{props.product.name}</strong></div>
                    <div className="mt-n1">por {props.product.author}</div>
                    

                    <div className="mt-3">{props.product.description}</div>
                    
                </div>

                <div className="col-2 text-right">
                    <div className="h4">R$ {props.product.price}</div>
                    <div className="mt-n2 mb-3">{props.product.stock_quantity>0?'Em estoque':'Produto indisponível'}</div>
                    <div>
                        <Button variant="contained" color="primary" size="large" disableElevation onClick={() => props.getProduct(props.product.id)}>
                            <strong>Comprar</strong>
                        </Button>
                    </div>
                </div>
        
                            
    
            </div> 

        </div>
    )
}


const mapStateToProps = (state) => ({
    currentProduct: state.general.currentProduct,
    product: state.general.product,

})


const mapDispatchToProps = (dispatch) => ({
    getProduct: (id) => dispatch({ type: 'ON_GET_PRODUCT', id: id}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
