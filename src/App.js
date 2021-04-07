import './App.css';
import MenuItems from './components/Navbar/MenuItems';
import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import {AddItemToCart, DeleteItemFromCart, Counter} from './cart.js';
import Header from './Header';
import Footer from './Footer.js';
import Masks from './Masks.js';
import Desit from './Desit.js';
import Mask1 from './Mask1.js';
import Mask2 from './Mask2.js';
import Mask3 from './Mask3.js';
import FabricMask1 from './FabricMask1.js';
import FabricMask2 from './FabricMask2.js';
import FabricMask3 from './FabricMask3.js';
import { useCycle } from "framer-motion";
import {maskScene, desiScene, gloveScene} from "./scenes.js";
import ImageHolder from "./ImageHolder";
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


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

function App() {

  let store = createStore(Counter);
  //store.subscribe(() => console.log(store.getState()));
  //store.dispatch(AddItemToCart())
  const [selectedItem, setSelectedItem] = useState()
  const [products, setProducts] = useState([])
  const [isLoaded, setStateToLoaded] = useState(false)

  return (
    <div className="App">
      <div className="content">

      <Header></Header>

      <div>
        {/*navigointi routerilla, yhdistetään jeren menuun myöhemmin */}
        <Router>
          <div className='navbar'>
          <li><Link to="/">Etusivu </Link></li>
          <li><Link to='/Masks'>Maskit</Link></li>
          <li><Link to='/Desit'>Käsidesit</Link></li>
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
            <Route path='/Desit'>
              <Desit />
            </Route>
            <Route path="/">
              <Etusivu />
            </Route>
          </Switch>
        </Router>
      
        {/*{MenuItems.MenuItems.map((item, index) => (
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
        }*/}
        </div>
        <Footer></Footer>
    </div>
  </div>
    
  );
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
function AdminPanel() {
  return (
    <form action="http://127.0.0.1:5000/adminPanel" method="get">
    <input type="submit" value="Submit"/>
    </form>
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

export default App;

