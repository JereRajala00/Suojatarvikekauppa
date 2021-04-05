import React from 'react';
import ReactDOM from 'react-dom';

// Redux function for adding item to cart
export const AddItemToCart = (productName) => {
    return {
        type: 'ADDITEMTOCART',
        productName
    }
}
// Redux function for deleting item from cart
export const DeleteItemFromCart = (productName) => {
    return {
        type: 'DELETEITEMFROMCART',
        productName
    }
}
// Redux reducer
export const Counter = (state = {}, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADDITEMTOCART':
            console.log(action);
            return {
              ...state, // copy all other quanities
              // update this property by adding 1 to the current quanity
              // or just add with quantity 1 if it didn't already exist
              [action.productName]: ( state[action.productName] || 0 ) + 1
            }
        case 'DELETEITEMFROMCART':
            return {
              ...state,
              [action.productName]: ( state[action.productName] || 1 ) - 1
            }
        default:
            return state
    }
  }

