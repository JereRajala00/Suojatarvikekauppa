import './App.css';

const Footer = () => {
    return (
    <div className="footer">
        <div className='footer-left'>
            <ul>
                <li>Tilaus- ja toimitusehdot</li>
                <li>Maksutavat</li>
                <li>Tuki</li>
                <li>Tietosuojakäytäntö</li>
            </ul>
        </div>

        <div className='footer-right'>
            <p>Suojatarvikekauppa <br></br>
            Kauppakatu 10, 40700, Jyväskylä <br></br>
            +358 44 1234567 <br>
            </br> suojatarvikekauppa@email.com</p>
        </div>
    </div> );
}
 
export default Footer;