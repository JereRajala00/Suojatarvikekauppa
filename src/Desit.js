import './App.css';
import desiimage1 from './img/desi60.jpg';
import desiimage2 from './img/desipumppu500.jpg';
import desiimage3 from './img/desi-litra.jpg';
import desiimage4 from './img/desisuihkepieni.jpg';
import desiimage5 from './img/desisuihkehajuton.jpg';
import desiimage6 from './img/desisuihkeiso.jpg';

const Desit = () => {
  return (
      <div className='page-content'>
      <h3>Käsidesit</h3>
      <p>Valikoimassamme on erikokoisia käsidesejä. Desejä saatavana nestemäisenä ja suihkeena.</p>
      <div className='product-grid'>
        <div className='product-box'>
        <img src={desiimage1} alt="desi 1"></img>
          <h4>Käsidesi - 59 ml</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
        <img src={desiimage2} alt="desi 2"></img>
          <h4>Käsidesi - Pumppupullo 500 ml</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
        <img src={desiimage3} alt="desi 3"></img>
          <h4>Käsidesi - Pumppupullo 1 L</h4>
          <p>123 €</p>
        </div>

        <div className='product-box'>
        <img src={desiimage4} alt="desi 4"></img>
          <h4>Käsidesisuihke Papaya- 100ml</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
        <img src={desiimage5} alt="desi 5"></img>
          <h4>Käsidesisuhke - 100ml</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
        <img src={desiimage6} alt="desi 6"></img>
          <h4>Käsidesisuhke - 1 L</h4>
          <p>123 €</p>
        </div>
      </div>
  </div>
  );
}

export default Desit;