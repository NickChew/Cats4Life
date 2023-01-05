// Brians example using Faker to get some fake data
import './App.css';
import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react';

function App() {

  const [allCats, setAllCats] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        if (!response.ok){
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const catData = data.map((cat, index) => {
          return {
            catId: index,
            catImage: cat.url,
            name: faker.name.findName(),
            breed: faker.animal.cat(),
            price: faker.finance.amount(100, 300),
            gender: faker.name.gender(),
            location: faker.address.country()
          }
        })
        setAllCats(catData);
      } catch(err) {
        setErrorMessage(err.errorMessage);
      }
    }
    fetchCatData();
  }, [])
  
  return (
    <div className="App">
      {allCats.map((cat, index) => {
        return (
          <div>
            <h3>Add to Cart</h3>
            <img src={cat.catImage} alt={cat.name} width="200px" />
            <h4>{cat.name}</h4>
            <p>£{cat.price}</p>
            <p>The cats gender is: {cat.gender}</p>
            <p>Breed : {cat.breed}</p>
            <p>Location:- {cat.location}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;