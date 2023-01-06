import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Character from "./Pages/Cats";
import { useState, useEffect } from "react";
import logo from "./Cats4Life.png";
import { faker } from '@faker-js/faker'
import Modal from "./Modal"

function App() {

  const [allCats, setAllCats] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentCat, setCurrentCat] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        const catData = data.map((cat, index) => { //for every image in the cat array, do this and it should be different
          return {
            catId: index,
            catImg: cat.url,
            name: faker.name.fullName(),
            price: faker.finance.amount(100, 300),
            breed: faker.animal.cat(),
            gender: faker.name.gender(),
            location: faker.address.country()
          }
        })
        setAllCats(catData);
      } catch (err) {
        setErrorMsg(err.errorMsg)
        console.log(errorMsg)
      }
    }
    fetchCatData();
  }, [])


  const handleClick = (catus) => {
    setCurrentCat(catus);
    setShowModal(true)
  }


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


      <div className="App">

        <div className='catData' >
          {allCats.map((cat, index) => {
            return (

              <div className='catInfo'>
                <h3> Add to cart</h3>
                <img key={index} src={cat.catImg} alt={cat.name} height='250px' width='250px' onClick={() => handleClick(cat)} />
              </div>

            )
          })}
        </div >

        {console.log(currentCat)}
        {showModal && <Modal closeModal={setShowModal} cat={currentCat}></Modal>}
      </div >

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

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const addToCart = () => {

  }
  // const removeFromCart = () =>{

  // } 
  <div className="buttons">
    {toggle ? (<h2>Add To Cart</h2>) : (<h2>Remove From Cart</h2>)}
    <button className={toggle ? "addToCart" : "removeFromCart"} onClick={handleToggle}>Add / Remove toggle</button>
  </div>

}

export default App;
