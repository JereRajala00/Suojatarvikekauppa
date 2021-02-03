const MainMenu = () => {
    const handleButton = () => {
        document.write("Testi");
    }
    return (<nav className="navbar">
        <button onClick={handleButton}>Maskit</button>
    </nav>  );
}
 
export default MainMenu;
