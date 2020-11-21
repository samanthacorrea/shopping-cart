import React from 'react';
import { connect } from 'react-redux';


const Products   = (props) => {
    return (
        <div>
            Olá, mundo!
        </div>
    )
}


const mapStateToProps = (state) => ({
    //products: state.general.authors,
})


const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
