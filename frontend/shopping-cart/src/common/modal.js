import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import asset from '../assets'
import helper from '../config/helper'

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
    let itemsList = props.itemsFormatter()
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="text-right">
            <CloseIcon onClick={() => props.setModalState(false)} style={{'cursor': 'pointer'}}/>
        </div>
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
                    <div className="row border-bottom pt-2 pb-2">
                        <div className="col-2">{item.count}</div>
                        <div className="col-7">{item.name}</div>
                        <div className="col-3">R$ {helper.currency(item.price)}</div>
                    </div>
                ))}
            </div>
            <div>
                <div><strong>Endereço de entrega:</strong></div>
                <div>Rua Francy Assis Nº2229, Chapada - Manaus, Am - 69050-750</div>
            </div>

        </div>
      </p>
    </div>
  );

  return (
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
  );
}

export default PaymentModal;