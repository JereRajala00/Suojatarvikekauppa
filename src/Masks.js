import './App.css';
import maskimage1 from './img/maskit.jpg';
import maskimage2 from './img/kangasmaski.jpg';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

const Masks = () => {
  return (
      <div className='page-content'>
        
      <h3>Maskit</h3>
      <p>Meiltä saat kertakäyttöisiä kirurgisia maskeja, sekä uudelleenkäytettäviä kangasmaskeja.</p>

      <div className='product-grid'>
      <Link to='/Mask1'>
      <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaski - 10kpl</h4>
          <p>123 €</p>
        </div></Link>
      
        <Link to='/Mask2'>
        <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaski - 25kpl</h4>
          <p>123 €</p>
        </div></Link>

        <Link to='/Mask3'>
        <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaski - 50kpl</h4>
          <p>123 €</p>
        </div></Link>

        <Link to='/FabricMask1'>
        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 1kpl</h4>
          <p>123 €</p>
        </div></Link>
        <Link to='/FabricMask2'>
        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 3kpl</h4>
          <p>123 €</p>
        </div></Link>
        <Link to='/FabricMask3'>
        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 6kpl</h4>
          <p>123 €</p>
        </div></Link>
      </div>
  </div>
  );
}

export default Masks;