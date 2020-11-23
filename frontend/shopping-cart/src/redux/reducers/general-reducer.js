import { Store } from '../store';
import axios from 'axios';


const initialState = {
    page: 'Products',
    product: null,
    currentProduct: null,
};



const REACT_APP_DNS = "http://127.0.0.1:8000";

// List products
const getProducts = () => {
    let url = REACT_APP_DNS + '/products/';
    axios.get(url)
        .then(result => {
            console.log(result.data)
            Store.dispatch({ type: 'ON_PRODUCTS', products: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};
getProducts();


// Product detail
const getProduct = (id) => {
    console.log('req ', id)
    let url = REACT_APP_DNS + `/products/${id}/`;
    axios.get(url)
        .then(result => {
            console.log('wmn')
            console.log(result.data)
            Store.dispatch({ type: 'ON_DATA_PRODUCT', product: result.data })
        })
        .catch(e => {
            console.log(e)
        })
};


export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {    
        case 'ON_PRODUCTS':
            return { ...state, products: action.products, page: "Products" }
        case 'ON_GET_PRODUCT':
            console.log(action.id)
            getProduct(action.id);
            return { ...state, currentProduct: action.id}  
        case 'ON_DATA_PRODUCT':
            console.log(action.product)
            return { ...state, product: action.product, page: 'Product'}  
        case 'ON_OPEN_SHOP_CART':
            console.log('open shop cart')
            return { ...state, page: 'ShopCart'}  
        default:
            return { ...state }
    }
}