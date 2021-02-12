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

      <p>Maskit
      </p>

      <Footer></Footer>
    </div>
  </div>
  );
}

export default App;