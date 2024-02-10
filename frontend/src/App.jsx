import Home from './components/Home.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import RecipesPage from './RecipePage/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';




import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  const onAddRecipes = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  }
  return (
    <Router>
      <div className="App">
      
        <Navbar className='navbar' sticky="top" bg="light" expand="lg">
          <Navbar.Brand href="#home">Recipe App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/recipes-page">Recipe Chart</Nav.Link>
              <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>
              <Nav.Link as={Link} to="/recipes"> Recipe List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes-page" element={<RecipesPage />} />
          <Route path="/add-recipe" element={<AddRecipe onAddRecipes={onAddRecipes} />} />
          <Route path="/recipes" element={<RecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

