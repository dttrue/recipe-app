import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = ({ onAddRecipes }) => {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [images, setImages] = useState(null);
    const [category, setCategory] = useState("");





    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            category,
            ingredients,
            id: uuidv4(),
            instructions,
            images
        }

        try {
            const response = await fetch("http://localhost:1111/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecipe),
            })

            if (response.ok) {
                toast.success("Recipe added successfully");
                setTitle("");
                setIngredients("");
                setInstructions("");
                setImages("");
                setCategory("");
                onAddRecipes(newRecipe);
            } else {
                const errorText = await response.text();
                throw new toast.error(
                    `Failed to add recipe. Status: ${response.status}. ${errorText}`
                )
            }
        } catch (error) {
            toast.error("Error adding recipe:", error);

        }
    }

    return (
       
        <form onSubmit={handleSubmit}>
            <ToastContainer
             position="top-center"
             autoClose={3000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="light"
              />
            <h3>Add Recipe</h3>
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor="category">Category:</label>
                        <input
                            id="category"
                            type="text"
                            className="form-control"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="col">

                        <label htmlFor="ingredients">Ingredients:</label>
                        <textarea
                            className="form-control"
                            type="text"
                            id="ingredients"
                            placeholder="Ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea
                            className="form-control"
                            id="instructions"
                            placeholder="Instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>


                </div>
            </div>
            <button className="btn btn-secondary mt-3" type="submit">Add Recipe</button>

        </form>



    )


}

AddRecipe.propTypes = {
    onAddRecipes: PropTypes.func.isRequired,
};


export default AddRecipe