import React from 'react';
import { connect } from 'react-redux';


const ShopCart = (props) => {
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