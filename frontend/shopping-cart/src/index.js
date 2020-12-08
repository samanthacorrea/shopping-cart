import React from 'react';
import ReactDOM from 'react-dom';
import Product from './pages/product-detail'
import Products from './pages/products'
import ShopCart from './pages/shop-cart'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from "react-redux"
import { Store } from './redux/store'
import AppBar from './common/appbar'
import { ApolloProvider } from 'react-apollo'
import client from './graphql/client'
import ProductsList from './containers/ProductsList'


import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

ReactDOM.render(
    <Router>
        <Switch>
            <Provider store={Store}>
                <ApolloProvider client={client}>
                    <AppBar />
                    <Route path="/" exact={true} component={ProductsList} />
                    <Route path="/products/:id" component={Product} />
                    <Route path="/shop-cart" exact component={ShopCart} />
                    <Redirect from='*' to="/"/>    
                </ApolloProvider>
                
            </Provider>
        </Switch>
    </Router>
    
    , document.getElementById('root'));