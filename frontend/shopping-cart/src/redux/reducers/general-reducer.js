const initialState = {
    totalPurchaseAmount: JSON.parse(localStorage.getItem('@shopCart/price')),
    shopCartItems: JSON.parse(localStorage.getItem('@shopCart/items')),
    quantityPurchase: JSON.parse(localStorage.getItem('@shopCart/quantity'))
};

export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {      
        case 'ON_UPDATE_TOTAL_PURCHASE_AMOUNT':
            return { ...state, totalPurchaseAmount: action.totalPurchaseAmount}
        case 'ON_UPDATE_QUANTITY_PURCHASE':
        return { ...state, quantityPurchase: action.quantityPurchase}
        case 'ON_UPDATE_SHOP_CART_ITEMS':
            return { ...state, shopCartItems: action.shopCartItems}
        default:
            return { ...state }
    }
}