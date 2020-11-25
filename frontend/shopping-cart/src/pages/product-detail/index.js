import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import requester from '../../config/requester'
import helper from '../../config/helper'

const Product = (props) => {    

    const [product, setProduct] = useState();

  
    useEffect(() => {
      requester.getProduct(props.match.params.id).then( result => {
          setProduct(result.data)
      }).catch(error => console.log(error))
    },[props.match.params.id]);

    const saveProduct = (product) => {
        requester.decrementStock(product.id).then(result => {
            let product = result.data
            setProduct(product)
            
            let item = {
                id: product.id,
                name: product.name,
                author: product.author,
                price: product.price,
                image: product.image
            }

            let items = JSON.parse(localStorage.getItem('@shopCart/items'))
            let total = JSON.parse(localStorage.getItem('@shopCart/price'))
            let dictionary = {}

            if (!items && !dictionary[product.id]) {
                console.log('não existe, add tudo')
                item.count = 1
                dictionary[product.id] = item
                localStorage.setItem('@shopCart/items', JSON.stringify(dictionary));
                localStorage.setItem('@shopCart/price', product.price);

                props.updateShopCartItems(dictionary)
                props.updateTotalPurchaseAmount(product.price)
                
            } else {
                console.log(items[product.id])
                if (items[product.id]) {
                    items[product.id].count += 1
                    localStorage.setItem('@shopCart/items', JSON.stringify(items));
                    total = Number(total) + Number(product.price)
                    localStorage.setItem('@shopCart/price', total);
                    props.updateShopCartItems(items)
                    props.updateTotalPurchaseAmount(total)
                    
                } else {
                    item.count = 1
                    items[product.id] = item
                    localStorage.setItem('@shopCart/items', JSON.stringify(items));
                    total = Number(total) + Number(product.price)
                    localStorage.setItem('@shopCart/price', total);
                    props.updateShopCartItems(items)
                    props.updateTotalPurchaseAmount(total)
                } 
            }
        }).catch(
            error => {
                console.log(error)
                if (error.response && error.response.status === 400) {
                    window.confirm("Esse item não está mais disponível em estoque.")
                }
            })   
    }

    return (
        <div className="container">      
            {
                product?

                <div className="row mt-5">
                
                    <div className="col-3">
                        <img src={product.image || asset.NO_IMAGE} alt={product.name} width="250" height="350"/>
                    </div>
                    
                    <div className="col-7">
                        <div className="h5"><strong>{product.name}</strong></div>
                        <div className="mt-n1">por <i>{product.author}</i></div>
                        <div className="mt-3">{product.description}</div>
                    </div>

                    <div className="col-2 text-right">
                        <div className="h4">R$ {helper.currency(product.price)}</div>
                        <div className="mt-n2 mb-3">{product.stock_quantity>0?'Em estoque':'Produto indisponível'}</div>
                        <div className="mt-n2 mb-3">{product.stock_quantity}</div>
                        <div>
                            <Button variant="contained" color="primary" size="large" disableElevation onClick={() => saveProduct(product)}>
                                <strong>Comprar</strong>
                            </Button>
                        </div>
                    </div>
                </div> 
                :
                <div>Produto não encontrado!</div>
            }
            

        </div>
    )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    updateShopCartItems: (shopCartItems) => dispatch({ type: 'ON_UPDATE_SHOP_CART_ITEMS', shopCartItems: shopCartItems}),
    updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product)