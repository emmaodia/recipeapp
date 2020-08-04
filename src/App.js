import React, { useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';
// import dotenv from 'dotenv';
// dotenv.config();

const APPID = process.env.REACT_APP_APPID;
const APPKEYS = process.env.REACT_APP_APPKEYS;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  //Use useEffect to log the contents of the API when Page Loads
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
//  https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APPID}&app_key=${APPKEYS}&from=0&to=3&calories=591-722&health=alcohol-free`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits)
  };

  const updateSearch = e => { 
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <h1>Recipe App</h1>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
}

export default App;
