import './App.css';
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { createStore } from 'redux';
import {AddItemToCart, DeleteItemFromCart, Counter} from './cart.js';
import Header from './header';
import Footer from './footer.js';

function App() {
  let store = createStore(Counter);
  store.subscribe(() => console.log(store.getState()));
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  return (
    <div className="App">
      <div className="content">
      
        <h1>Suojavarustekauppa</h1>
      <Header></Header>
      <div className='navbar'>
        {MenuItems.MenuItems.map((item, index) => (
          <li key={index} onClick={() => setSelectedItem(item.title)}
          style={{cursor: "pointer"}}>{item.title}</li>
        ))}
        {selectedItem && (
          <h1>{selectedItem}</h1>
        )}
        {selectedItem == 'Maskit' &&
          <div><h1><GetProductsHtml/></h1></div>
        }
        </div>

      <p>Tervetuloa suojatarvikekauppaan!<br></br>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>

      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <br></br>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <br></br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
  	    <Footer></Footer>
      </div>
    </div>
    
  );
  
  async function initProducts() {
    fetch(`http://127.0.0.1:5000/listProducts`)
        .then(response => response.json())
        .then(response => {
            setProducts(response.result);
            console.log(response.result);
        
    }
        )}

function GetProductsHtml() {
    initProducts()
    return products.map(products =>
      <div>
        <h2>{products.ProductName}</h2>
        <h2>{products.ProductDescription}</h2>
        <h2>{products.ProductQuantity} units available</h2>
        <button onClick="store.dispatch(AddItemToCart())">Add to cart</button>
        <button onClick="store.subscribe(() => console.log(store.getState()));">Show cart</button>
        </div>
    );
}

}

export default App;