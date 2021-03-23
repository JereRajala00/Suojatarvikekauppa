import './App.css';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer.js';
import React, { useEffect } from "react";
import { useCycle } from "framer-motion";
import {maskScene, desiScene, gloveScene} from "./scenes.js";
import ImageHolder from "./ImageHolder";

const SLIDE_CHANGE_TIME_MS = 5000;

function App() {

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
    <div className="App">
      <div className="content">
      <Header></Header>
      
      <div className="gallery">
      <ImageHolder
        img={currentScene.image}
        className="gallery-image"
      />
      </div>

      <h3>Tervetuloa suojatarvikekauppaan!</h3>

      <p>Täältä löydät kaiken tarvitsemasi suojatuaksesi COVID-19 -virukselta.<br></br>

      Tuotteistamme löydät käsidesiä, kasvomaskeja jshaisfjksaf
      <br></br>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <br></br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
  	    <Footer></Footer>
      </div>
    </div>
    
  );
}

export default App;

