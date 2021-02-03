import logo from './logo.svg';
import './App.css';
import MainMenu from './MainMenu';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <div className="content">
      <Header></Header>
      <MainMenu></MainMenu>

      <p>Tervetuloa suojatarvikekauppaan!<br></br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <Footer></Footer>
    </div>
  </div>
  );
}

export default App;
