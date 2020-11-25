import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import asset from '../../assets'
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import helper from '../../config/helper'



const ShopCart = (props) => {

    const [countItem, setCountItem] = useState();

    let items = JSON.parse(localStorage.getItem('@shopCart/items'))
    let total = JSON.parse(localStorage.getItem('@shopCart/price'))

    const itemsFormatter = () => {
        let itemsList = []
        for (let index in items) {
            itemsList.push(items[index])
        }
        return itemsList;
    }

    let itemsList = itemsFormatter()

    const currency = (value) => {
        return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2})
    }
    
    const saveProduct = (id) => {
        console.log(id)
        
        helper.decrement(id).then(result => {

            let items = JSON.parse(localStorage.getItem('@shopCart/items'))
            let total = JSON.parse(localStorage.getItem('@shopCart/price'))

            console.log(items[id])
        
            
            items[id].count += 1
            console.log(items[id].count)
            localStorage.setItem('@shopCart/items', JSON.stringify(items));


            total = Number(total) + Number(items[id].price)
            localStorage.setItem('@shopCart/price', total);
            props.updateTotalPurchaseAmount(total)

        }).catch(
            error => {
                console.log(error.response.status)
                if (error.response.status === 400) {
                    window.confirm("Esse item não está mais disponível em estoque.")
                }
            })
        
                    
    }

	return (
		<div className="container mt-5">
            
                {
                    items?
                    <div className="row">
                        <div className="col-12 mr-3 p-4">
                            <div className="h3">Carrinho de Compras</div>

                            <div>
                                {itemsList&&itemsList.map((item, index) => (
                                    <div className="row mt-4 border-bottom" key={index}>
                                        <div className="col-2">
                                            <img src={itemsList[index].image || asset.NO_IMAGE} alt={itemsList[index].name} width="120" height="160"/>
                                        </div>
                                        <div className="col-7 ml-n5 ">
                                            <div className="h5">{itemsList[index].name}</div>
                                            <div className="mt-n2">por {itemsList[index].author}</div>
                                            <div className="mt-4">
                                                <span>Qtd.:</span>

                                                <RemoveIcon className="mt-n1 ml-3" style={{cursor: 'pointer'}} onClick={() => props.removeItem(itemsList[index].id)}/>
                                                <span className="ml-3 mr-3">{itemsList[index].count}</span>
                                                <AddIcon className="mt-n1" style={{cursor: 'pointer'}} onClick={() => saveProduct(itemsList[index].id)}/>
                           
                                                <span className="ml-4 mr-3">|</span>

                                                <DeleteIcon className="mt-n1" style={{cursor: 'pointer'}}/>
                                                
                                            </div>

                                        </div>
                                        <div className="col-3 hborder-bottom h4 text-right">
                                            <strong>R$ {itemsList[index].price}</strong>
                                        </div>

                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 p-4 text-right">
                            <div className="h4">Total do pedido:</div>
                            <div className="h4"><strong>R$ {currency(total)}</strong></div>
                            <div>
                                <Button variant="contained" size="large" disableElevation>
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
                
            
        </div>
	);
}

const mapStateToProps = (state) => ({
    stockQuantity: state.general.stockQuantityById,
    hasStock: state.general.hasStock,

    
});

const mapDispatchToProps = (dispatch) => ({
    getStockQuantityById: (id) => dispatch({ type: 'ON_GET_STOCK_QUANTITY', id: id}),
    addItem: (id) => dispatch({ type: 'ON_ADD_ITEM', id: id}),
    removeItem: (id) => dispatch({ type: 'ON_ITEM_ITEM', id: id}),
    updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)