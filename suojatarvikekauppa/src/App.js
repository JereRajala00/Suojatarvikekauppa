import logo from './logo.svg';
import './App.css';
import MenuItems from './components/Navbar/MenuItems';

function App() {
  const click = () => {
    alert("testi");
  }
  console.log(MenuItems.MenuItems.length)
  let items = MenuItems.MenuItems.map((item,index) =>{
    console.log(item);
    return (<li onClick={click}>{item.title}</li>);
  })
  console.log(items)
  return (
    <div className="App">
      <div className="content">
        <h1>Suojavarustekauppa</h1>
        {items}
      </div>
    </div>
    
  );
}

export default App;
