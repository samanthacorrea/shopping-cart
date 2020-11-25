import { Store } from '../store';
import axios from 'axios';


const initialState = {
    page: 'Products',
    //product: null,
    currentProduct: null,
    total: 0,
    totalPurchaseAmount: JSON.parse(localStorage.getItem('@shopCart/price')),
    stockQuantityById: null,
};



const REACT_APP_DNS = "http://127.0.0.1:8000";

// List products
const getProducts = () => {
    let url = REACT_APP_DNS + '/products/';
    axios.get(url)
        .then(result => {
                Store.dispatch({ type: 'ON_PRODUCTS', products: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};
getProducts();


// Product detail
const getProduct = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/`;
    axios.get(url)
        .then(result => {
            Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
            Store.dispatch({ type: 'ON_HAS_STOCK', hasStock: true })
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_HAS_STOCK', hasStock: false })
        })
};

const updateStock = (id, quantity, total) => {
    console.log(id + " " + quantity + " " + total)
    let url = REACT_APP_DNS + `/products/${id}/`;
    let params = {
        stock_quantity: quantity
    }
    
    axios.patch(url, params)
        .then(result => {
            console.log(result.data);
            Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
            Store.dispatch({ type: 'ON_UPDATE_SHOP_CART_VALUES', quantity: quantity, total: total})
        })
        .catch(e => {
            console.log(e)
        })
};

const getStockQuantityById = (id) => {
    console.log("stock: " + id)
    let url = REACT_APP_DNS + `/products/${id}/stock/`;

    axios.get(url)
    .then(result => {
        console.log("stock result")
        console.log(result.data.stock_quantity);
        Store.dispatch({ type: 'ON_STOCK_QUANTITY', stockQuantityById: result.data.stock_quantity })
    })
    .catch(e => {
        console.log(e)
    })
}

const increment = (id) => {
    //console.log(id)
    let url = REACT_APP_DNS + `/products/${id}/`;
 

    let items = JSON.parse(localStorage.getItem('@shopCart/items'))
    console.log(items)

}

const decrementOriginal = (id) => {
    //console.log(id)
    let url = REACT_APP_DNS + `/products/${id}/decrement/`;

    axios.patch(url)
    .then(result => {
        console.log(result.data.message);
        Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
        //Store.dispatch({ type: 'ON_UPDATE_SHOP_CART_VALUES', quantity: quantity, total: total})
    })
    .catch(e => {
        console.log(e)
    })
}

const decrement = (result) => {
    console.log('result: ', result);
    Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
}



export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {    
        case 'ON_PRODUCTS':
            return { ...state, products: action.products, page: "Products" }
        case 'ON_GET_PRODUCT':
            getProduct(action.id);
            return { ...state, currentProduct: action.id}  
        case 'ON_DATA_PRODUCT':
            return { ...state, product: action.product, page: 'Product'}  
        case 'ON_OPEN_SHOP_CART':
            return { ...state, page: 'ShopCart'}  
        case 'ON_UPDATE_STOCK':
            updateStock(action.id, action.stockQuantity, action.price)
            return { ...state }
        case 'ON_INCREMENT':
            increment(action.id)
            return { ...state }
        case 'ON_DECREMENT':
            decrement(action.result)
            return { ...state }
        case 'ON_GET_STOCK_QUANTITY':
            getStockQuantityById(action.id)
            return { ...state }
        case 'ON_STOCK_QUANTITY':
            console.log('on_stock_quantity')
            console.log(action.stockQuantityById)
            return { ...state, stockQuantityById: action.stockQuantityById}
        case 'ON_HAS_STOCK': 
            console.log(action.hasStock)
            return { ...state, hasStock: action.hasStock}
        case 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT':
            console.log(action)
            return { ...state, totalPurchaseAmount: action.totalPurchaseAmount}
        default:
            return { ...state }
    }
}