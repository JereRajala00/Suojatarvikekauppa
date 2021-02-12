import React from 'react';

const MainMenu = () => {
    const handleButton = () => {
        document.write("Testi");
    }
    return (<nav className="navbar">
        <button onClick={handleButton}>Maskit</button>
        <button onClick={handleButton}>Maskit</button>
    </nav>  );
}
 
export default MainMenu;