import React from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';


const Product = (props) => {    

    //let currentProduct = JSON.parse(localStorage.getItem('@library/currentProduct'));
    console.log(props.product)
        let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));

    

    //const [cookies, setCookie, removeCookie] = useCookies(['cookie_teste_sam']);
    
    const saveProduct = (id, price, stock_quantity) => {
        console.log('id ', id)

        let productsId = []        
        

        let items = JSON.parse(localStorage.getItem('@shopCart/items'))
        let total = JSON.parse(localStorage.getItem('@shopCart/price'))

        
        if(!items) {
            productsId.push(id)
            localStorage.setItem('@shopCart/items', JSON.stringify(productsId));
            localStorage.setItem('@shopCart/price', price);
            //decrementar o stock_quantity patch
            let quantity = stock_quantity - 1;

            if (quantity > -1) props.updateStock(id, quantity)
            else alert('Estoque indisponível')
        } else {
            console.log('já tinha um ')
            items.push(id)
            total = Number(total) + Number(price)
            console.log(items)
            localStorage.setItem('@shopCart/items', JSON.stringify(items));
            localStorage.setItem('@shopCart/price', total);

            let quantity = stock_quantity - 1;
            
            if (quantity > -1) props.updateStock(id, quantity)
            else alert('Estoque indisponível')

        }
        
    }


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
                        <Button variant="contained" color="primary" size="large" disableElevation onClick={() => saveProduct(props.product.id, props.product.price, props.product.stock_quantity)}>
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
    updateStock: (id, stockQuantity) => dispatch({ type: 'ON_UPDATE_STOCK', id: id, stockQuantity: stockQuantity}),

    
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
