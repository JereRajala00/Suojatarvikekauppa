const MainMenu = () => {
    const handleButton = () => {
        document.write("Testi");
    }
    return (<nav className="Navbar">
        <button onClick={handleButton}>Maskit</button>
    </nav>  );
}
 
export default MainMenu;