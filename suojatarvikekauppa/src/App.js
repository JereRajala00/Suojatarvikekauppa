import './App.css';
import Maskit from './components/ItemCategory1/index'
import MenuItems from './components/Navbar/MenuItems';
import ReactDOM from 'react-dom'
import React, { useState } from 'react'

function App() {
  const [selectedItem, setSelectedItem] = useState();
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
        <div>
          <Maskit/>
        </div>
        }

      </div>
    </div>
    
  );
}

export default App;
