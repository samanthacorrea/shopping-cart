import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import requester from '../../config/requester'
import helper from '../../config/helper'
import PaymentModal from '../../common/modal'
import Item from './item'

const ShopCart = (props) => {

    
    let items = JSON.parse(localStorage.getItem('@shopCart/items'))
    console.log(localStorage.getItem('@shopCart/items'))
    let total = JSON.parse(localStorage.getItem('@shopCart/price'))

    const [open, setOpen] = useState(false);

    const setModalState = (status) => {
        setOpen(status);
    };

    let itemsList = helper.itemsFormatter(items)
    console.log(itemsList.toString())


    const addItem = (id) => {
        requester.decrementStock(id).then(result => {      
            let product = result.data

            if (!(product&&product.message)) {
            
                console.log(result.data)
                let items = JSON.parse(localStorage.getItem('@shopCart/items'))
                let total = JSON.parse(localStorage.getItem('@shopCart/price'))
                let quantity = JSON.parse(localStorage.getItem('@shopCart/quantity'))
                props.updateQuantityPurchase(items)
                

                console.log('entrou')
                items[id].count += 1
                console.log("items no carrinho", items[id].count)
                console.log("items em stock", result.data.stock_quantity)
                localStorage.setItem('@shopCart/items', JSON.stringify(items));
                props.updateShopCartItems(items) 

                total = Number(total) + Number(items[id].price)
                localStorage.setItem('@shopCart/price', total);
                props.updateTotalPurchaseAmount(total)


                quantity += 1
                localStorage.setItem('@shopCart/quantity', quantity);
                props.updateQuantityPurchase(items)
            } else {
                alert(product.message)
            }

        }).catch(
            error => {
                console.log(error)
            })               
    }


    const removeItem = (id, shopItemsQuantity) => {
        requester.incrementStock(id, shopItemsQuantity).then(result => {

            let items = JSON.parse(localStorage.getItem('@shopCart/items'))
            let total = JSON.parse(localStorage.getItem('@shopCart/price'))
            let quantity = JSON.parse(localStorage.getItem('@shopCart/quantity'))
            props.updateQuantityPurchase(items)
            

            if(items[id].count > 1) {
                items[id].count -= 1
                localStorage.setItem('@shopCart/items', JSON.stringify(items));
    
                props.updateShopCartItems(items) 
    
                total = Number(total) - Number(items[id].price)
                localStorage.setItem('@shopCart/price', total);
                props.updateTotalPurchaseAmount(total)
                quantity -= 1
                localStorage.setItem('@shopCart/quantity', quantity);
                props.updateQuantityPurchase(items)
            }

        }).catch(
            error => {
                if (error.response && error.response.status === 400) {
                    window.confirm("Esse item não está mais disponível em estoque.")
                }
            })
    }

    const isEmptyObject = (obj) => {
        var name;
        for (name in obj) return false;
        return true;
    }

    const giveBackAllItemsToStock = (id, shopItemsQuantity) => {
        if (window.confirm('Deseja realmente remover esse item do seu carrinho?')) {
            requester.giveBackAllItemsToStock(id, shopItemsQuantity).then(result => {
                console.log(result.data)
                console.log(shopItemsQuantity)
                let items = JSON.parse(localStorage.getItem('@shopCart/items'))
                let total = JSON.parse(localStorage.getItem('@shopCart/price'))
                let quantity = JSON.parse(localStorage.getItem('@shopCart/quantity'))

                delete items[id]
            

                total -= (result.data.price * shopItemsQuantity)
                if (total > 0) localStorage.setItem('@shopCart/price', total);
                else {
                    total = 0
                    localStorage.setItem('@shopCart/price', total);
                }
                localStorage.setItem('@shopCart/items', JSON.stringify(items));
                
                quantity -= shopItemsQuantity
                localStorage.setItem('@shopCart/quantity', quantity)
                props.updateTotalPurchaseAmount(total)
                props.updateShopCartItems(items) 
                props.updateQuantityPurchase(items)
                
            }).catch(
                error => {
                    console.log(error)
                })    
        }
    }

	return (
		<div className="container mt-5">
            
                {
                    items&&!isEmptyObject(items)?
                    <div className="row">
                        <div className="col-12 mr-3 p-4">
                            <div className="mt-n5 mb-5 h3">Carrinho de Compras</div>

                            <div>
                                {itemsList&&itemsList.map((item) => (
                                    <Item 
                                        item={item}
                                        removeItem={removeItem}
                                        addItem={addItem}
                                        giveBackAllItemsToStock={giveBackAllItemsToStock}/>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 p-4 text-right">
                            <div className="h4">Total do pedido:</div>
                            <div className="h4"><strong>R$ {helper.currency(total)}</strong></div>
                            <div>                                
                                <Button variant="contained" size="large" disableElevation onClick={() => setModalState(true)}>
                                    <strong>Fechar Pedido</strong>
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-12 text-center">
                        <div className="h3">Seu carrinho de compras está vazio</div>
                        <div>
                            <Link to="/">
                                Clique aqui para voltar para a página inicial
                            </Link>
                        </div>
                    </div>
                }
                
                <PaymentModal 
                    setModalState={setModalState} 
                    open={open} 
                    items={JSON.parse(localStorage.getItem('@shopCart/items'))}
                    total={JSON.parse(localStorage.getItem('@shopCart/price'))}
                    itemsFormatter={helper.itemsFormatter}/>
                
        </div>
	);
}

const mapStateToProps = (state) => ({
    shopCartItems: state.general.shopCartItems,
});

const mapDispatchToProps = (dispatch) => ({
    updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),
    updateQuantityPurchase: (quantityPurchase) => dispatch({ type: 'ON_UPDATE_QUANTITY_PURCHASE', quantityPurchase: quantityPurchase}),
    updateShopCartItems: (shopCartItems) => dispatch({ type: 'ON_UPDATE_SHOP_CART_ITEMS', shopCartItems: shopCartItems}),
});



export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)