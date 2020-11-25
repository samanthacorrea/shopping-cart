import React from 'react';
import ReactDOM from 'react-dom';
import Product from './pages/product-detail'
import Products from './pages/products'
import ShopCart from './pages/shop-cart'
import Checkout from './pages/checkout'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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
                <Route path="/shop-cart" exact component={ShopCart} />
                <Route path="/shop-cart/checkout" component={Checkout} />
                <Redirect from='*' to="/"/>
            </Provider>
        </Switch>
    </Router>
    
    , document.getElementById('root'));