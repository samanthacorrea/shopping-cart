import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom'
import asset from '../../assets'
import helper from '../../config/helper'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const SearchAppBar = (props) => {
  const classes = useStyles();

  

  let items = JSON.parse(localStorage.getItem('@shopCart/items'))
  let price = JSON.parse(localStorage.getItem('@shopCart/price'))
  console.log(props.totalPurchaseAmount)
  console.log(price)

  useEffect(() => {
    props.updateTotalPurchaseAmount(price)
    props.updateTotalPurchaseAmount(price)
    },[props.totalPurchaseAmount], );

  const itemsQuantity = () => {
    let itemsTotal = 0;
    for (let item in items) {
      itemsTotal += items[item].count;
    }
    return itemsTotal;
  }

  let itemsTotal = itemsQuantity();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <img src={asset.LOGO} alt="logo" width="80" height="50"/>
              <strong>MASSAM'S SHOP</strong>
            </Link>
          </Typography>
          <span className="mr-3 h5">R$ {props.totalPurchaseAmount?helper.currency(props.totalPurchaseAmount):'0,00'}</span>
          <Link to="/shop-cart" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Badge badgeContent={itemsTotal>0?itemsTotal:'0'} color="secondary">
              <ShoppingCartRoundedIcon fontSize="large"/>
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  totalPurchaseAmount: state.general.totalPurchaseAmount,
});


const mapDispatchToProps = (dispatch) => ({
  updateTotalPurchaseAmount: (totalPurchaseAmount) => dispatch({ type: 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT', totalPurchaseAmount: totalPurchaseAmount}),

});



export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar)

