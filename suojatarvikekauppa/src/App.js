import './App.css';
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom'
import React, { useState } from 'react'

function App() {
  
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  return (
    <div className="App">
      <div className="content">
        <h1>Suojavarustekauppa</h1>
        {MenuItems.MenuItems.map((item, index) => (
          <li key={index} onClick={() => setSelectedItem(item.title)}
          style={{cursor: "pointer"}}>{item.title}</li>
        ))}
        {selectedItem && (
          <h1 style={{textAlign: 'center'}}>{selectedItem}</h1>
        )}
        {selectedItem == 'Maskit' &&
          <div><h1><GetProductsHtml/></h1></div>
        }

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
        </div>
    );
}
}

export default App;
