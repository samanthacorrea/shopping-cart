import { Store } from '../store';
import axios from 'axios';


const initialState = {
    page: 'Products',
};


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