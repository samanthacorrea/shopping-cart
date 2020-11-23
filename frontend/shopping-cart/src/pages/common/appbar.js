import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchAppBar = (props) => {
  const classes = useStyles();

  let items = JSON.parse(localStorage.getItem('@shopCart/items'))
  let total = JSON.parse(localStorage.getItem('@shopCart/price'))

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
               
          </Typography>


          <span className="mr-2">{itemsTotal>0?itemsTotal:'0'}</span>
          <ShoppingCartRoundedIcon fontSize="large" onClick={() => props.openShopCart()} style={{cursor: 'pointer'}}/>
          <span className="ml-3">R$ {total&&Number(total)>0?total:'0.00'}</span>
           {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = (state) => ({
  quantityItems: state.general.quantityItems,
  total: state.general.total,
});

const mapDispatchToProps = (dispatch) => ({
  openShopCart: () => dispatch({ type: 'ON_OPEN_SHOP_CART'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar)

