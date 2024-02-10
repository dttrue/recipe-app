import { useState, useEffect } from "react";
import axios from "axios";



const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [showRecipeForm, setShowRecipeForm] = useState(false);
   

    useEffect(() => {
        axios.get("http://localhost:1111/api/recipes")
            .then((response) => {
              
                if (Array.isArray(response.data.data)) {
                    setRecipes(response.data.data);
                } else {
                  
                    console.error("Data received is not an array");
                }
            })
            .catch((error) => {
                console.log("Error fetching recipes:", error);
                setRecipes([]); 
            })
    }, []);

    const handleDelete = async (recipeId) => {
        try {
            const response = await axios.delete(`http://localhost:1111/api/recipes/${recipeId}`);
            if (response.status === 200) {
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
            } else {
                alert("Failed to delete recipe");
            }
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("Error occurred while trying to delete recipe");
        }
    };

    const handleRecipeToggle = () => {
        setShowRecipeForm(!showRecipeForm);
    }

 
    
    
   
    
    return (
        <div className="container my-5 ">
            <h1>Recipe List</h1>
        
            <button type="button" className="btn btn-secondary" onClick={handleRecipeToggle}>
                 
                {showRecipeForm ? "Hide Recipe List" : "Show Recipe List" }</button>
            {showRecipeForm &&(
         <ul className="list-group">
         {recipes.map((recipe) => (
           <li className="list-group-item" key={recipe.id}>
             <h2>{recipe.id}</h2>
             <p className="lead">Title:</p>
             <h2>{recipe.title}</h2>
             <p className="lead">Category:{ recipe.category}</p>
             <p className="lead">Ingredients:</p>
             {/* Render each ingredient in its own list item */}
             <ul className="list-group">
               {recipe.ingredients.map((ingredient, index) => (
                 <li className="list-group-item" key={index}>{ingredient}</li>
               ))}
             </ul>
             <p className="lead">Instructions:</p>
             <p>{recipe.instructions}</p>
             <p className="lead">Image:</p>
             <div>
               {recipe.image && (
                 <img src={`http://localhost:1111/images/${recipe.image}`} alt={recipe.title} />
               )}
             </div>
             <button type="button" className="btn btn-danger" onClick={() => handleDelete(recipe.id)}>Delete</button>
           </li>                
         ))}
       </ul>
            )}
        </div>


    )
}

export default RecipeList
