import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import helper from '../config/helper'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import requester from '../config/requester';
import asset from '../assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const PaymentModal = (props) => {
    let itemsList = props.itemsFormatter(props.items)

    const [creditCard, setCreditCard] = useState('disapproved');
    const [step, setStep] = useState(1);

    const setRadioState = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        setCreditCard(event.target.value);
    };

    const closeModal = () => {
        setStep(1)
        props.setModalState(false)
    }

    const checkout = (creditCard, address) => {
        let cardId=1
        if (creditCard === 'disapproved') cardId=2
        
        let order = {
            "cardId": cardId,
            "address": address.textContent,
            "productsId": helper.productsInOrderFormatter(props.items)
        }
    
    
        requester.checkout(order).then(result => {      
            setStep(2)
            localStorage.removeItem('@shopCart/items')
            localStorage.removeItem('@shopCart/price')
            props.updateTotalPurchaseAmount(0)
        }).catch(
            error => {
                console.log(error)
                if (error.response && error.response.status === 403) {
                    setStep(3)
                } else {
                    setStep(4)
                }
            })
    }
  
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="text-right">
            <CloseIcon onClick={() => closeModal()} style={{'cursor': 'pointer'}}/>
        </div>
        {
            step==1?
            <div>
                <div id="simple-modal-title" className="h3 text-center mt-n4" style={{"fontSize": "30px"}}>Finalize seu pedido</div>
                <p id="simple-modal-description">
                    <div>
                        <div>
                            <div className="row text-uppercase mt-4">
                                <div className="col-2"><strong>qtd.</strong></div>
                                <div className="col-7"><strong>nome do produto</strong></div>
                                <div className="col-3"><strong>preço (un)</strong></div>
                            </div>
                            {itemsList&&itemsList.map((item, index) => (    
                                <div className="row border-bottom pt-2 pb-2" key={index}>
                                    <div className="col-2">{item.count}</div>
                                    <div className="col-7">{item.name}</div>
                                    <div className="col-3">R$ {helper.currency(item.price)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-2 text-uppercase">
                            
                        </div>
                        <div className="col-7 text-right">
                            <strong>Total do pedido</strong>
                        </div>
                        <div className="col-3">
                            <strong>R$ {helper.currency(props.total)}</strong>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div><strong>Endereço de entrega:</strong></div>
                        <div id="address">Rua Francy Assis Nº2229, Chapada - Manaus, Am - 69050-750</div>
                    </div>

                    <div className="mt-4">
                        <strong>Foma de pagamento:</strong>
                    </div>
                    <div >
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="creditCard" name="creditCard" value={creditCard ? creditCard : " "} onChange={setRadioState}>
                                <FormControlLabel value="disapproved" control={<Radio color="primary"/>} label="**** **** **** 8520 (07/2019)" />
                                <FormControlLabel className="mt-n3" value="approved" control={<Radio color="primary"/>} label="**** **** **** 7765 (09/2022)" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className="text-center">
                        <Button variant="contained" size="large" color="primary" 
                        onClick={() => checkout(creditCard, document.getElementById('address'))}>
                            <strong>Confirmar Pedido</strong>
                        </Button>
                    </div>
                </p>
            </div>:
            step==2?
                <div className="text-center">
                    <div className="h3 mb-5">
                        Seu pedido foi realizado!
                        <div className="mt-2">
                            <img src={asset.CHECK || asset.NO_IMAGE} alt="aprovado" width="100" height="90"/>
                        </div>
                    </div>
                    <Link to="/">
                        Continuar comprando
                    </Link>
                </div>:
            step==3?
                <div>reprovado</div>:
                <div>aconteceu algum problema</div>
        }
    </div>
  );

  return (
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {
            body
        }
        
      </Modal>
  );
}

const mapStateToProps = (state) => ({

});
  
  
const mapDispatchToProps = (dispatch) => ({
    updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),
});
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal)