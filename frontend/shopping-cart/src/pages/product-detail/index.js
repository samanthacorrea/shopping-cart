import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import requester from '../../config/requester'
import helper from '../../config/helper'
import ProductDetail from './product-detail'

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

            if (!(product&&product.message)) {
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
                props.updateQuantityPurchase(items)
                
                let dictionary = {}

                if (!items && !dictionary[product.id]) {
                    //console.log('não existe, add tudo')
                    item.count = 1
                    localStorage.setItem('@shopCart/quantity', item.count);
                    dictionary[product.id] = item
                    localStorage.setItem('@shopCart/items', JSON.stringify(dictionary));
                    localStorage.setItem('@shopCart/price', product.price);
                    props.updateShopCartItems(dictionary)
                    props.updateTotalPurchaseAmount(product.price)
                    
                } else {
                    //console.log(items[product.id])
                    if (items[product.id]) {
                        console.log('achou na lista')
                        items[product.id].count += 1
                        localStorage.setItem('@shopCart/items', JSON.stringify(items));
                        total = Number(total) + Number(product.price)
                        localStorage.setItem('@shopCart/price', total);
                        props.updateShopCartItems(items)
                        props.updateTotalPurchaseAmount(total)
                        
                    } else {
                        // se tem algo, mas nao tem o id especifico
                        console.log('atingivel?')
                        item.count = 1
                        items[product.id] = item
                        localStorage.setItem('@shopCart/items', JSON.stringify(items));
                        total = Number(total) + Number(product.price)
                        localStorage.setItem('@shopCart/price', total);
                        props.updateShopCartItems(items)
                        props.updateTotalPurchaseAmount(total)
                        
                    } 
                    let itemsQuantity = helper.itemsQuantity(items)
                    console.log(itemsQuantity)
                    localStorage.setItem('@shopCart/quantity', itemsQuantity);
                    props.updateQuantityPurchase(items)
                    
                }
                
            } else {
                alert(product.message)
            }
        
        }).catch(
            error => {
                console.log(error)
        })   
    } 

    return (
        <div className="container">      
            {
                product?<ProductDetail product={product} saveProduct={saveProduct}/>:<div>Produto não encontrado!</div>
            }
            

        </div>
    )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    updateShopCartItems: (shopCartItems) => dispatch({ type: 'ON_UPDATE_SHOP_CART_ITEMS', shopCartItems: shopCartItems}),
    updateQuantityPurchase: (quantityPurchase) => dispatch({ type: 'ON_UPDATE_QUANTITY_PURCHASE', quantityPurchase: quantityPurchase}),
    updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product)