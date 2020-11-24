import { Store } from '../store';
import axios from 'axios';


const initialState = {
    page: 'Products',
    product: null,
    currentProduct: null,
    total: 0,
    quantityItems: 0,
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
            console.log(result.data)
            Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
        })
        .catch(e => {
            console.log(e)
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

const addItem = (id) => {
    console.log(id)
    let url = REACT_APP_DNS + `/products/${id}/`;
 

    let items = JSON.parse(localStorage.getItem('@shopCart/items')).id
    console.log(items)

    // axios.patch(url, params)
    // .then(result => {
    //     console.log(result.data);
    //     Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
    //     Store.dispatch({ type: 'ON_UPDATE_SHOP_CART_VALUES', quantity: quantity, total: total})
    // })
    // .catch(e => {
    //     console.log(e)
    // })
}

const removeItem = (id) => {
    
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
        case 'ON_ADD_ITEM':
            console.log(action)
            addItem(action.id)
            return { ...state }
        case 'ON_REMOVE_ITEM':
            console.log(action)
            removeItem(action.id)
            return { ...state }
    
        case 'ON_UPDATE_SHOP_CART_VALUES':
            return { ...state, quantity: action.quantity, total: action.total}
        default:
            return { ...state }
    }
}