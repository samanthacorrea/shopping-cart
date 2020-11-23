import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Product from './pages/product-detail'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/product-detailed" component={Product} />
            {/* <Route path="/sobre" component={Sobre} /> */}
        </Switch>
    </BrowserRouter>
    
    , document.getElementById('root'));