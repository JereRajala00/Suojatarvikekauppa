import './App.css';
import maskimage1 from './img/maskit.jpg';
import maskimage2 from './img/kangasmaski.jpg';

const Masks = () => {
  return (
      <div className='page-content'>
      <h3>Maskit</h3>
      <p>Meiltä saat kertakäyttöisiä, sekä kangasmaskeja.</p>
      <div className='product-grid'>
        <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaskit - 10kpl</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaskit - 25kpl</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
          <img src={maskimage1} alt='mask1'></img>
          <h4>Kertakäyttömaskit - 50kpl</h4>
          <p>123 €</p>
        </div>

        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 1kpl</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 3kpl</h4>
          <p>123 €</p>
        </div>
        <div className='product-box'>
          <img src={maskimage2} alt='mask1'></img>
          <h4>Kangasmaski - 6kpl</h4>
          <p>123 €</p>
        </div>
      </div>
  </div>
  );
}

export default Masks;