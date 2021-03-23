import MenuItems from './components/Navbar/MenuItems';
import { createStore } from 'redux';
import {AddItemToCart, DeleteItemFromCart, Counter} from './cart.js';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Header = () => {
    let store = createStore(Counter);
  //store.subscribe(() => console.log(store.getState()));
  //store.dispatch(AddItemToCart())
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  const [isLoaded, setStateToLoaded] = useState(false)
    
    return (<div className="header">
        <h1>Suojatarvikekauppa</h1>

        <div className='navbar'>
        {MenuItems.MenuItems.map((item, index) => (
          <li key={index} onClick={() => setSelectedItem(item.title)}
          style={{cursor: "pointer"}}>{item.title}</li>
        ))}
        {selectedItem && (
          <h1>{selectedItem}</h1>
        )}
        {(selectedItem == 'Maskit') &&
          <div><GetProductsHtml/></div>
        }
        {(selectedItem == 'Ostoskori') &&
          <div><PlaceOrder/></div>
        }
        {(selectedItem == 'Rekisteröidy') &&
          <div><RegisterAccount/></div>
        }
        {(selectedItem == 'Kirjaudu sisään') &&
          <div><LoginForm/></div>
        }
        </div>
    </div> );

async function initProducts() {
    if (!isLoaded) {
      fetch(`http://127.0.0.1:5000/listProducts`)
      .then(response => response.json())
      .then(response => {
          setProducts(response.result);
          console.log(response.result);
          setStateToLoaded(true);
  }
      )
    }
    }

function GetProductsHtml() {
    initProducts()
    const AddItem = () => {
      console.log("Testi");
      store.subscribe(() => console.log(store.getState()));
      store.dispatch(AddItemToCart())
    }
    //store.dispatch(AddItemToCart())
    //store.subscribe(() => console.log(store.getState()))
    return products.map(products =>
      <div key={products.ProductID}>
        <h2>{products.ProductName}</h2>
        <h2>{products.ProductDescription}</h2>
        <h2>{products.ProductQuantity} units available</h2>
        
        <button onClick={AddItem}>Add to cart</button>
        <button onClick={AddItem}>Show cart</button>
        </div>
    );
}
function PlaceOrder() {
  return (
  <div>
  <form action="http://127.0.0.1:5000/placeOrder" method="post">
  First name:<br/>
  <input type="text" name="firstname"/><br/>
  Last name:<br/>
  <input type="text" name="lastname"/><br/>
  Address:<br/>
  <input type="text" name="address"/><br/>
  <input type="submit" value="Submit"/>
  </form>
</div>
  );
}
function RegisterAccount() {
  return (
    <div>
    <form action="http://127.0.0.1:5000/registerAccount" method="post">
    Etunimi:<br/>
    <input type="text" name="firstname"/><br/>
    Sukunimi:<br/>
    <input type="text" name="lastname"/><br/>
    Osoite:<br/>
    <input type="text" name="address"/><br/>
    Sähköposti:<br/>
    <input type="text" name="email"/><br/>
    Puhelin:<br/>
    <input type="text" name="phone"/><br/>
    Salasana:<br/>
    <input type="password" name="password"/><br/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
  );
}
function LoginForm() {
  return (
    <div>
    <form action="http://127.0.0.1:5000/login" method="post">
    Sähköposti:<br/>
    <input type="text" name="email"/><br/>
    Salasana:<br/>
    <input type="password" name="password"/><br/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
  );
}
}
 
export default Header;