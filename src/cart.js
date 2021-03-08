import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
//import ReactRedux from 'react-redux';
//import {createStore} from 'redux';

export const AddItemToCart = () => {
    return {
        name: 'ADDITEMTOCART'
    }
}
export const DeleteItemFromCart = () => {
    return {
        name: 'DELETEITEMFROMCART'
    }
}
export const Counter = (state = 0, action) => {
    switch (action.type) {
        case 'ADDITEMTOCART':
            return state + 1;
        case 'DELETEITEMFROMCART':
            return state - 1;
    }
}
//let store = createStore(Counter);
//store.subscribe(() => console.log(store.getState()));
