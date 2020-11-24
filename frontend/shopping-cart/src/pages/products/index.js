import React from 'react';
import { connect } from 'react-redux';
import asset from '../../assets'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const Products = (props) => {    
    return (
        <div className="container">
            
              {props.products&&props.products.map((product, index) => (
                  
                      <div className="row mt-4" key={index}>
                        
                          <div className="col-2">
                            <img src={product.image || asset.NO_IMAGE} alt={product.name} width="150" height="200"/>
                          </div>
                          <div className="col-9 border-bottom">
                            <div><strong>{product.name}</strong></div>
                            <div>por {product.author}</div>
                            <div className="h4">R$ {product.price.toString().toLocaleString('pt-br', {minimumFractionDigits: 2})}</div>
                            <div style={{'marginTop': '80px'}}>
                                <Link to={"/product/" + product.id}>
                                  <Button onClick={() => props.getProduct(product.id)} variant="contained">Mais detalhes</Button>
                                </Link> 
                                
                              
                            </div>
                          </div>
                      </div> 
              ))}
        </div>
    )
}


const mapStateToProps = (state) => ({
    products: state.general.products,
})


const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch({ type: 'ON_GET_PRODUCT', id: id}),

})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
