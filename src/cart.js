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
export const Counter = (state = [], action) => {
    switch (action.type) {
        case 'ADDITEMTOCART':
            let itemIndex = state.findIndex(x => x.productID == action.productID);
           if(itemIndex != -1){
             state.push({
               key:   action.productID,
               value: value + 1
             });
            } else {
              state[itemIndex].value +=1; 
             }
            return [...state];
        case 'DELETEITEMFROMCART':
            let itemIndex = state.findIndex(x => x.productID == action.productID);
            state[itemIndex].value -=1;
            if(state[itemIndex].value == 0){
              state.splice(itemIndex, 1);
            }
            return [...state];
    }
}

