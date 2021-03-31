import React from 'react';
import ReactDOM from 'react-dom';

// Redux function for adding item to cart
export const AddItemToCart = (productID) => {
    return {
        type: 'ADDITEMTOCART',
        productID
    }
}
// Redux function for deleting item from cart
export const DeleteItemFromCart = (productID) => {
    return {
        type: 'DELETEITEMFROMCART',
        productID
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
              [action.productID]: ( state[action.productID] || 0 ) + 1
            }
        case 'DELETEITEMFROMCART':
            return {
              ...state,
              [action.productID]: ( state[action.productID] || 1 ) - 1
            }
    }
  }

