import './App.css';
import Contacts from './components/ItemCategory1/index'
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom'
import React, { useState } from 'react'
var temp = false;

function App() {

  const [selectedItem, setSelectedItem] = useState()
  const [contacts, setContacts] = useState({})
  if (temp == false) {
    getProducts();
    temp = true;
  }
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
          <div><h1>{JSON.stringify(contacts.result, null, 4)}</h1></div>
        }

      </div>
    </div>
    
  );
  function getProducts() {
    fetch('http://127.0.0.1:5000/listUsers')
    .then(res => res.json())
    .then(contacts => setContacts(contacts))
    .catch(console.log)
}
}

export default App;
