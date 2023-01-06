import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "./Cats4Life.png";
import { faker } from '@faker-js/faker'
import Modal from "./Modal"

function App() {

  const [allCats, setAllCats] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentCat, setCurrentCat] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);

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
            inCart: false,
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
        setErrorMessage(err.errorMessage)
        console.log(errorMessage)
      }
    }
    fetchCatData();
  }, [])


  const handleClick = (catus) => {
    setCurrentCat(catus);
    setShowModal(true)
  }

const handleAddToCart = (catData, index) => {
  if (!catData.inCart){
    let updatedCats=[...allCats];
    updatedCats[index].inCart = true;
    setAllCats(updatedCats);

    let updatedCart=[...cart];
    updatedCart.push(catData);
    setCart(updatedCart)
    console.log(catData);
    
  } else {
    for(let i=0; i<cart.length; i++){
      if (cart[i].catId === index){
        let removeCatFromCart = [...cart];
        removeCatFromCart.splice(i,1);
        setCart(removeCatFromCart);

        let updatedAllCats=[...allCats];
        updatedAllCats[index].inCart=false;
        setAllCats(updatedAllCats);
      }
    }
  }
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
                <img key={index} src={cat.catImg} alt={cat.name} height='300px' width='250px' onClick={() => handleClick(cat)} />
                <h2 key={index} onClick={()=>handleAddToCart(cat, index)}> Add to cart</h2>

              </div>
            )
          })}
        </div >

        {console.log(currentCat)}
        {showModal && <Modal closeModal={setShowModal} cat={currentCat}></Modal>}
      </div >
   
    
      <div className="Footer">
        <footer>
          <Link to="/">Home</Link><br></br>
          <Link to="/Pages/About.js">About us</Link><br></br>
          <Link to="/">Shop</Link><br></br>
          <Link to="/Pages/PetAdvice.js">Pet advice</Link><br></br>
          <Link to="/Pages/Contact.js">Contact</Link>
          <li>Facebook</li>
          <li>twitter </li>
          <li>Snapchat</li>
          <li>Copyright ©</li>
        </footer>
      </div>
    </BrowserRouter>

  );

  // following should add addToCart to cart and add up or remove and subtract

//   const [toggle, setToggle] = useState(false);
//   const [cart, setCart] = useState({});
//   const [totalCart, setTotalcart] = useState({});

//   const handleToggle = () => {
//     setToggle(!toggle)
//   }

//   const addToCart = () => {
//     <div>
//       <h3> Added to cart</h3>
//       <img key={index} src={cat.catImg} alt={cat.name} height='250px' width='250px' />

//     </div>
//   }

//   const removeFromCart = () =>{

//   } 
//   <div className="buttons">
//     {toggle ? (<h2>Add To Cart</h2>) : (<h2>Remove From Cart</h2>)}
//     <button className={toggle ? "addToCart" : "removeFromCart"} onClick={handleToggle}>Add / Remove toggle</button>
//   </div>

}

export default App;
