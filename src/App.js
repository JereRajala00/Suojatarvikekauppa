import './App.css';
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import store from './index';
import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import {AddItemToCart, DeleteItemFromCart, Counter} from './cart.js';
import Header from './Header';
import Footer from './Footer.js';
import { useCycle } from "framer-motion";
import {maskScene, desiScene, gloveScene} from "./scenes.js";
import ImageHolder from "./ImageHolder";
import Masks from './Masks.js';
//import Desit from './Desit.js';
import Mask1 from './Mask1.js';
import Mask2 from './Mask2.js';
import Mask3 from './Mask3.js';
import FabricMask1 from './FabricMask1.js';
import FabricMask2 from './FabricMask2.js';
import FabricMask3 from './FabricMask3.js';

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


function App() {
  // Intialize Redux store and navbar
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  const [isLoaded, setStateToLoaded] = useState(false)
  const [customerInfo, setCustomerInfo] = useState([])
  const [authToken, setAuthToken] = useState()
  // Render content based on user choice
  return (

    <div className="App">
        <div className="content">

        <Header></Header>

        <div>
          {/*navigointi routerilla, yhdistetään jeren menuun myöhemmin */}
          <Router>
            <div className='navbar'>
            <li><button onClick={() => setSelectedItem('Etusivu')}>Etusivu</button></li>
            <li><button onClick={() => setSelectedItem('Maskit')}>Maskit</button></li>
            <li><button onClick={() => setSelectedItem('Käsidesit')}>Käsidesit</button></li>
            <li><button onClick={() => setSelectedItem('Kirjaudu sisään')}>Kirjaudu sisään</button></li>
            </div>

            <Switch>
              <Route path='/Masks'>
                <Masks />
              </Route>
              <Route path='/Mask1'>
                <Mask1 />
              </Route>
              <Route path='/Mask2'>
                <Mask2 />
              </Route>
              <Route path='/Mask3'>
                <Mask3 />
              </Route>
              <Route path='/FabricMask1'>
                <FabricMask1 />
              </Route>
              <Route path='/FabricMask2'>
                <FabricMask2 />
              </Route>
              <Route path='/FabricMask3'>
                <FabricMask3 />
              </Route>
              {/*<Route path='/Desit'>
                <Desit />
    </Route>*/}
              <Route path="/">
                <Etusivu />
              </Route>
            </Switch>
          </Router>
        </div>
        <div>
          {/*MenuItems.MenuItems.map((item, index) => (
            <li key={index} onClick={() => setSelectedItem(item.title)}
            style={{cursor: "pointer"}}>{item.title}</li>
          ))*/}
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
          <div><Footer></Footer>

  <Footer></Footer></div>
  </div></div>
  );

  function Etusivu() {

  const SLIDE_CHANGE_TIME_MS = 5000
  const [currentScene, setCurrentScene] = useCycle(
    maskScene,
    desiScene,
    gloveScene
  );

  useEffect(() => {
    const timeOut = setTimeout(setCurrentScene, SLIDE_CHANGE_TIME_MS);
    return () => clearTimeout(timeOut);
  }, [currentScene, setCurrentScene]);

  return (
  <div>
  <div className="gallery">
        <ImageHolder
          img={currentScene.image}
          className="gallery-image"
        />
        </div>
        <h3>Tervetuloa suojatarvikekauppaan!</h3>

        <p>Täältä löydät kaiken tarvitsemasi suojatuaksesi COVID-19 -virukselta.<br></br>

        Tuotteistamme löydät käsidesiä j kasvomaskeja.
        <br></br>
        <br></br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        <br></br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        </div>
  )
  }



      
          
          

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
        /*firstname: document.getElementById("order_firstname").value,
        lastname: document.getElementById("order_lastname").value,
        address: document.getElementById("order_address").value,
        zip: document.getElementById("order_zip").value,
        city: document.getElementById("order_city").value,
        email: document.getElementById("order_email").value,
        phone: document.getElementById("order_phone").value,*/
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
      Sähköposti:<br/>
      <input type="text" name="email" id="login_email"/><br/>
      Salasana:<br/>
      <input type="password" name="password" id="login_password"/><br/>
      <button onClick={() => Login()}>Kirjaudu sisään</button>
      </div>
    );
  }
  function Login() {
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: document.getElementById("login_email").value,
        password: document.getElementById("login_password").value
      })
    })
    .then(res => res.json())
    .then(response => setAuthToken(response))
    .catch(error => console.error('Error:', error));
  }

  }
export default App;
