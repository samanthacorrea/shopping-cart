import React from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import products from '../products';

const Product = (props) => {    

    const saveProduct = (product) => {


        let items = JSON.parse(localStorage.getItem('@shopCart/items'))
        let total = JSON.parse(localStorage.getItem('@shopCart/price'))

        let item = {
            id: product.id,
            name: product.name,
            author: product.author,
            price: product.price
        }   

        let dictionary = {}
        console.log(dictionary[product.id])
        console.log(items)

        let quantity = product.stock_quantity - 1;

        if (quantity > -1) {
            if (!items && !dictionary[product.id]) {
                console.log('não existe, add tudo')
                item.count = 1
                dictionary[product.id] = item
                localStorage.setItem('@shopCart/items', JSON.stringify(dictionary));


                localStorage.setItem('@shopCart/price', product.price);
                    props.updateStock(product.id, quantity, props.price)
            } else {
                console.log(items[product.id])
                if (items[product.id]) {
                    console.log('existe o id, atualiza o count')
                    items[product.id].count += 1
                    console.log(items[product.id].count)
                    localStorage.setItem('@shopCart/items', JSON.stringify(items));


                    total = Number(total) + Number(product.price)
                    localStorage.setItem('@shopCart/price', total);
                    props.updateStock(product.id, quantity, total)
                } else {
                    console.log('adiciona um novo indice')
                    item.count = 1
                    items[product.id] = item
                    console.log(items)
                    localStorage.setItem('@shopCart/items', JSON.stringify(items));

                    total = Number(total) + Number(product.price)
                    localStorage.setItem('@shopCart/price', total);
                    props.updateStock(product.id, quantity, total)
                }
                    
            }
        } else {
            alert("Estoque indisponível!")
        }


        


        
        
    }
    // const saveProduct = (product) => {

    //     let item = {
    //         id: product.id,
    //         name: product.name,
    //         author: product.author,
    //         price: product.price,
    //         //stock_quantity: product.stock_quantity

    //     }

    //     console.log(item)

    //     let productsId = []        

    //     let items = JSON.parse(localStorage.getItem('@shopCart/items'))
    //     let total = JSON.parse(localStorage.getItem('@shopCart/price'))

        
    //     if(!items) {
    //         let quantity = product.stock_quantity - 1;
            

    //         if (quantity > -1) {
    //             productsId.push(item)
    //             localStorage.setItem('@shopCart/items', JSON.stringify(productsId));
    //             localStorage.setItem('@shopCart/price', product.price);
    //             props.updateStock(product.id, quantity, props.price)
    //         }
    //         else alert('Estoque indisponível')
    //     } else {
            
    //         let quantity = product.stock_quantity - 1;
            
    //         if (quantity > -1) {
    //             items.push(item)
    //             total = Number(total) + Number(product.price)
    //             localStorage.setItem('@shopCart/items', JSON.stringify(items));
    //             localStorage.setItem('@shopCart/price', total);    
    //             props.updateStock(product.id, quantity, total)
    //         }
    //         else alert('Estoque indisponível')

    //     }
        
    // }


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
                        <Button variant="contained" color="primary" size="large" disableElevation onClick={() => saveProduct(props.product)}>
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
    updateStock: (id, stockQuantity, price) => dispatch({ type: 'ON_UPDATE_STOCK', id: id, stockQuantity: stockQuantity, price: price}),
    updateShopCart: (quantity, price) => dispatch({ type: 'ON_UPDATE_SHOP_CART_VALUES', quantity: quantity, price: price}),

    

    
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
