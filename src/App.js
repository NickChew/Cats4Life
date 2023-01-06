
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Character from "./Pages/Cats";
import { useState, useEffect } from "react";
import logo from "./Cats4Life.png";

function App() {

  const [allCats, setAllCats] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
   const fetchData = async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      const data = await response.json();
      setAllCats(data);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="navBar">
        <nav>
          <img id="logo" src={logo} alt="Cats4Life logo"></img>
          <Link to="/">Home</Link>
          <Link to="/Pages/About.js">About us</Link>
          <Link to="/">Shop</Link>
          <Link to="/Pages/PetAdvice.js">Pet advice</Link>
          <Link to="/Pages/Contact.js">Contact</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home charArr={allCats} />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
      <h1>Footer</h1>
    </BrowserRouter>

  );

// following should add addToCart to cart and add up or remove and subtract

  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState({});
  
  const handleToggle = () =>{
    setToggle(!toggle)
  } 
  
  const addToCart = () =>{
    
  }
  // const removeFromCart = () =>{

  // } 
  <div className="buttons">
    {toggle ? (<h2>Add To Cart</h2>) : (<h2>Remove From Cart</h2>)}
    <button className={toggle ? "addToCart" : "removeFromCart"} onClick={handleToggle}>Add / Remove toggle</button>
  </div>
  
}

export default App;
