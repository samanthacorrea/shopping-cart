import { Store } from '../store';
import axios from 'axios';


const initialState = {
    page: 'Products',
};



const REACT_APP_DNS = "http://127.0.0.1:8000";

// List products
const getProducts = () => {
    let url = REACT_APP_DNS + '/products/';
    axios.get(url)
        .then(result => {
            console.log('teste')
            console.log(result.data)
            Store.dispatch({ type: 'ON_PRODUCTS', products: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};
getProducts();


export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {    
        case 'ON_PRODUCTS':
            return { ...state, products: action.products, page: "Products" }
        default:
            return { ...state }
    }
}