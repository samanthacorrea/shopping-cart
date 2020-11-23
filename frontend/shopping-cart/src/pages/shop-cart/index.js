import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import asset from '../../assets'
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';


const ShopCart = (props) => {

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
    console.log(itemsList)

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
                                                <TextField
                                                    className="col-2 ml-2 mt-n2 mr-2"
                                                    id="standard-number"
                                                    value={itemsList[index].count}
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />

                                                <Button className="mt-n1" variant="contained" size="small" disableElevation>
                                                    Atualizar    
                                                </Button>
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
                            <div className="h4"><strong>R$ {total}</strong></div>
                            <div>
                                <Button variant="contained" size="large" disableElevation>
                                    <strong>Fechar Pedido</strong>
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-12 text-center">
                        <div className="h3">Seu carrinho de compras está vazio.</div>

                        {/* Criar um link de continuar comprando e redirecionar para a página inicial */}
                    </div>
                }
                
            
        </div>
	);
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)