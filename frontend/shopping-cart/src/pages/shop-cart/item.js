import React from 'react'
import asset from '../../assets'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import helper from '../../config/helper'

const Item = (props) => {

	return (
        <div className="row mt-4 border-bottom">
            <div className="col-2">
                <img src={props.item.image || asset.NO_IMAGE} alt={props.item.name} width="120" height="160"/>
            </div>
            <div className="col-7 ml-n5 ">
                <div className="h5"><strong>{props.item.name}</strong></div>
                <div className="mt-n2">por <i>{props.item.author}</i></div>
                <div className="mt-">R$ {helper.currency(props.item.price)}</div>

                <div className="mt-4">
                    <span>Qtd.:</span>
                    
                    <RemoveIcon className="mt-n1 ml-3" style={{cursor: 'pointer'}} onClick={() => props.removeItem(props.item.id, props.item.count)}/>
                    <span className="ml-3 mr-3">{props.item.count}</span>
                    <AddIcon className="mt-n1" style={{cursor: 'pointer'}} onClick={() => props.addItem(props.item.id)}/>

                    <span className="ml-4 mr-3">|</span>

                    <DeleteIcon className="mt-n1" style={{cursor: 'pointer'}} onClick={() => props.giveBackAllItemsToStock(props.item.id, props.item.count)}/>
                    
                </div>
            </div>
            <div className="col-3 ml-5 hborder-bottom h4 text-right">
                <strong>R$ {helper.currency(props.item.price*props.item.count)}</strong>
            </div>
        </div> 
	);
}




export default Item