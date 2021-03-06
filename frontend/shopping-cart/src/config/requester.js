import axios from 'axios';

const REACT_APP_DNS = "http://127.0.0.1:8000";

const decrementStock = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/decrement/`;
    return axios.patch(url)
}

const incrementStock = (id, shopItemsQuantity) => {
    let url = REACT_APP_DNS + `/products/${id}/increment/`;
    let params = {
        "stock_quantity": shopItemsQuantity
    }
    return axios.patch(url, params)
}

const giveBackAllItemsToStock = (id, shopItemsQuantity) => {
    let url = REACT_APP_DNS + `/products/${id}/update_stock/`;
    let params = {
        "stock_quantity": shopItemsQuantity
    }
    return axios.patch(url, params)
}

const getProducts = () => {
    let url = REACT_APP_DNS + '/products/';
    return axios.get(url)
};

const getProduct = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/`;
    return axios.get(url)
};

const checkout = (order) => {
    let url = REACT_APP_DNS + '/orders/';
    return axios.post(url, order)
}

const requesters =  {
    decrementStock,
    incrementStock,
    getProducts,
    getProduct,
    giveBackAllItemsToStock,
    checkout
};

export default requesters