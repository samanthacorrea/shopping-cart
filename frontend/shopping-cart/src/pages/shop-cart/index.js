import React from 'react';
import { connect } from 'react-redux';


const ShopCart = (props) => {

    let arr = JSON.parse(localStorage.getItem('@shopCart/items'))

    const teste = () => {
        console.log(arr)

        var novaArr = arr.filter(function(este, i) {
            console.log(JSON.stringify(este))
            return arr.indexOf(JSON.stringify(este)) === i;
        });
        console.log(novaArr);
    }
    teste();

	return (
		<div className="container">
            <div className="row">
                <div className="col-8">
                    a
                </div>
                <div className="col-2">
                    b
                </div>
            </div>
        </div>
	);
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)