import './App.css';
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Header from './header';
import Footer from './footer.js';
import { useSelector, useDispatch } from 'react-redux';
import { AddItemToCart } from './cart';
import store from './index';


function App() {
  // Intialize Redux store and navbar
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  const [isLoaded, setStateToLoaded] = useState(false)
  const [customerInfo, setCustomerInfo] = useState([])
  // Render content based on user choice
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
        {(selectedItem == 'Admin') &&
          <div><AdminPanel/></div>
        }
        </div>

  	    <Footer></Footer>
      </div>
    </div>
    
  );
  // Function for calling listProducts API method and returning result
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
// Create HTML based on product information received from database
function GetProductsHtml() {
    initProducts()
    const dispatch = useDispatch();
    return products.map(products =>
      <div key={products.ProductID}>
        <h2>{products.ProductName}</h2>
        <h2>{products.ProductDescription}</h2>
        <h2>{products.ProductQuantity} units available</h2>
        
        <button onClick={() => dispatch(AddItemToCart(products.ProductName))}>Add to cart</button>
        </div>
    );
}
// Function for displaying shopping cart contents
function ShowCartContents() {
  // Convert object to string or JSON before rendering!
  const state = useSelector((state) => state);
  const cartContentsJSON = JSON.stringify(state);

  return (
    <div>
        <h2>Ostoskorin sisältö: {cartContentsJSON}</h2>
        <button onClick={() => GetCustomerInfo()}>
        Proceed
        </button>
      </div>
  );
}
// Function for fetching information of logged user
function GetCustomerInfo() {
  fetch('http://127.0.0.1:5000/getCustomerInfo', {
    method: 'GET',
    credentials: 'include'
  })
      .then((response) => response.json())
      .then((response) => {
        setCustomerInfo(response);
      })
      .catch((error) => {
        console.error(error);
      });
      return (
        <div>
          <h2>
            {customerInfo}
          </h2>
        </div>
      );
}
function PlaceOrder() {
  return (
    <div>
    Etunimi:<br/>
    <input type="text" name="firstname" id="order_firstname"/><br/>
    Sukunimi:<br/>
    <input type="text" name="lastname" id="order_lastname"/><br/>
    Osoite:<br/>
    <input type="text" name="address" id="order_address"/><br/>
    Sähköposti:<br/>
    <input type="text" name="email" id="order_email"/><br/>
    Puhelin:<br/>
    <input type="text" name="phone" id="order_phone"/><br/>
    Postinumero:<br/>
    <input type="number" name="zip" id="order_zip"/><br/>
    Kaupunki:<br/>
    <input type="text" name="city" id="order_city"/><br/>
    <button onClick={() => SubmitOrder()}></button>
    </div>
  );
}
function SubmitOrder() {
  console.log(store.getState());
  const cartContents = JSON.stringify(store.getState());
  fetch('http://127.0.0.1:5000/placeOrder', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: document.getElementById("order_firstname").value,
      lastname: document.getElementById("order_lastname").value,
      address: document.getElementById("order_address").value,
      zip: document.getElementById("order_zip").value,
      city: document.getElementById("order_city").value,
      email: document.getElementById("order_email").value,
      phone: document.getElementById("order_phone").value,
      orderInfo: cartContents
    })
  })
}
// Function for calling adminPanel API call, under development
function AdminPanel() {
  return (
    <form action="http://127.0.0.1:5000/adminPanel" method="get">
    <input type="submit" value="Submit"/>
    </form>
  );
}
// Function for generating HTML form for account registration
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
// Function for generating HTML form for account login
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

export default App;
