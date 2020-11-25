const initialState = {
    totalPurchaseAmount: JSON.parse(localStorage.getItem('@shopCart/price')),
    shopCartItems: JSON.parse(localStorage.getItem('@shopCart/items')),
};

export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {      
        case 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT':
            console.log(action.totalPurchaseAmount)
            return { ...state, totalPurchaseAmount: action.totalPurchaseAmount}
        case 'ON_UPDATE_SHOP_CART_ITEMS':
            console.log(action.shopCartItems)
            return { ...state, shopCartItems: action.shopCartItems}
        default:
            return { ...state }
    }
}