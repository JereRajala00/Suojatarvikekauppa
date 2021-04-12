import './App.css';
import maskimage1 from './img/maskit.jpg';

const Mask3 = () => {
    return (
    <div className='page-content'>
        <h3>Kertakäyttömaskit - 50kpl</h3>

        <div className='product-page'>
        <img src={maskimage1}></img>

        <div className='product-desc'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></br>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <form>
                    <label for='quantity'>
                        Kpl: 
                        <input type='number' name='quantity' placeholder='1' min='1' max='10'></input>
                    </label>
                    <input type='submit' id='submit' value='Lisää ostoskoriin'></input>
                </form>
        </div>

    </div> 
</div>
    );
}
export default Mask3;