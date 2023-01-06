import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Character from './Pages/Cats';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker'
// api_key=live_ykD4IvUF2Vht4ALDZOSGTY2fQRrYvtu4EZv3lOnTUiP3jZgQYUq8PjGW2EHdwmIK

function App() {
  const [allCats, setAllCats] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);

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
            name: faker.name.findName(),
            breed: faker.finance.amount(100, 300),
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

  return (

    <div className="App">
      <div className='Wrapper'>
        <div className='catData' >
          {allCats.map((cat, index) => {
            return (
              <div className='catInfo'>
                <h3> Add to cart</h3>
                <img src={cat.catImg} alt={cat.name} height='250px' width='250px'></img>
                <h4>{cat.name}</h4>
                <p>£{cat.price}</p>
                <p>{cat.gender}</p>
                <p>Breed : {cat.breed}</p>
                <p>Location: {cat.location}</p>
              </div>

            )
          })}
        </div >
      </div>
    </div >







    // <BrowserRouter>
    //   <nav>
    //     <Link to="/">Home</Link>
    //   </nav>
    //   <Routes>
    //     <Route path='/' element={<Home charArr={allCats} />} />
    //     <Route path='/character/:id' element={<Character />} />
    //   </Routes>
    //   <h1>Footer</h1>
    // </BrowserRouter>
  );
}

export default App;