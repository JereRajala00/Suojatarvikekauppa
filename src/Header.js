import search from "./img/Search.png";
import account from "./img/Account.png";
import cart from "./img/Cart.png";

const Header = () => {
    
    return (<div className="header">
        <h1>Suojavarustekauppa</h1>
        <div className="header-menu">
        <img src={search} alt="search"></img>
        <img src={account} alt="account"></img>
        <img src={cart} alt="cart"></img>
        </div>

    </div> );
}
 
export default Header;