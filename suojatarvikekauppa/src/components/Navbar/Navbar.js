import React, { Component } from 'react';
import { MenuItems } from './MenuItems';

class Navbar extends Component {
    render() {
        return(
            <React.Fragment>
            <nav className="NavbarItems">
                <h1 className="navbar-logo">React</h1>
                <div className="menu-icon"></div>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li><a className={item.cname} href={item.url}>
                                {item.title}
                            </a>
                            </li>
                        )
                        })}
                    
                </ul>
            </nav>
            </React.Fragment>
        );
    }
}
export default Navbar