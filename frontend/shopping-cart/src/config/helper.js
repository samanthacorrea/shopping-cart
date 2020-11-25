import axios from 'axios';

const REACT_APP_DNS = "http://127.0.0.1:8000";

const decrementStock = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/decrement/`;
    return axios.patch(url)
}

const incrementStock = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/increment/`;
    return axios.patch(url)
}

const getProducts = () => {
    let url = REACT_APP_DNS + '/products/';
    return axios.get(url)
};

const getProduct = (id) => {
    let url = REACT_APP_DNS + `/products/${id}/`;
    return axios.get(url)
};

const productRequests =  {
    decrementStock,
    incrementStock,
    getProducts,
    getProduct,
};

export default productRequests