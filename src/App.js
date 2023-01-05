import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Cats from './Pages/Cats';
import { useState, useEffect } from 'react';

// api_key=live_ykD4IvUF2Vht4ALDZOSGTY2fQRrYvtu4EZv3lOnTUiP3jZgQYUq8PjGW2EHdwmIK // for thecatapi.com

function App() {
    
  const [allCats, setAllCats] = useState([]);

  useEffect(() => {
      const fetchData = async () => {    
          const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
          const data = await response.json();        
          setAllCats(data);            
      }
  fetchData(); 
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>       
      </nav>
      <Routes>
        <Route path='/' element={ <Home charArr={allCats} />} />
        <Route path='/Cats/:id' element={ <Cats />} />        
      </Routes>
      <h1>Footer</h1>
    </BrowserRouter>
  );
}

export default App;