import React from 'react';
import ReactDOM from 'react-dom';
import Product from './pages/product-detail'
import Products from './pages/products'
import ShopCart from './pages/shop-cart'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import { Store } from './redux/store'
import AppBar from './pages/common/appbar'

ReactDOM.render(
    <Router>
        <Switch>
            <Provider store={Store}>
                <AppBar />
                <Route path="/" exact={true} component={Products} />
                <Route path="/products/:id" component={Product} />
                <Route path="/shop-cart" component={ShopCart} />
            </Provider>
        </Switch>
    </Router>
    
    , document.getElementById('root'));