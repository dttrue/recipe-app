// Import the 'fs/promises' module, which provides a Promise-based API for the file system
import fs from "fs/promises";


// Define the file path where the recipes data is stored
const filePath = "./data/recipes.json";

// Define the file path where the subscribers data is stored
const subscriberFilePath = "./data/subscribers.json";

//desc Get all recipes
//route GET /api/recipes
//access Public
export const getRecipes = async (req, res, next) => {
  // Read the contents of the recipes file
  const dataBuffer = await fs.readFile(filePath);
  // Parse the JSON data into a JavaScript object
  const recipes = JSON.parse(dataBuffer.toString());
  // Send a response with a status code of 200 and the recipes data
  res
    .status(200)
    .send({ data: recipes, message: "Recipes fetched successfully" });
};

//desc Get single recipe
//route GET /api/recipes/:id
//access Public
export const getRecipe = async (req, res, next) => {
  // Read the contents of the recipes file
  const dataBuffer = await fs.readFile(filePath);
  // Parse the JSON data into a JavaScript object
  const recipes = JSON.parse(dataBuffer.toString());
  // Find the recipe with the specified id from the request's URL parameters
  const recipe = recipes.find((recipe) => recipe.id === req.params.id);
  // Send a response with a status code of 200 and the found recipe data
  res
    .status(200)
    .send({ data: recipe, message: "Recipe fetched successfully" });
};

//desc Add new recipe
//route POST /api/recipes
//access Public
export const addRecipe = async (req, res, next) => {
  // Get the new recipe data from the request body
  const newRecipe = req.body;
  // Read the contents of the recipes file
  const dataBuffer = await fs.readFile(filePath);
  // Parse the JSON data into a JavaScript object
  const recipes = JSON.parse(dataBuffer.toString());
  // Add the new recipe to the recipes array
  recipes.push(newRecipe);
  // Write the updated recipes data back to the file
  await fs.writeFile(filePath, JSON.stringify(recipes));
  // Send a response with a status code of 201 and the updated recipes data
  res.status(201).send({ data: recipes, message: "Recipe added successfully" });
};

//desc Update recipe
//route PUT /api/recipes/:id
//access Public
export const updateRecipe = async (req, res, next) => {
  // Get the updated recipe data from the request body
  const updatedRecipeData = req.body;
  // Read the contents of the recipes file
  const dataBuffer = await fs.readFile(filePath);
  // Parse the JSON data into a JavaScript object
  const recipes = JSON.parse(dataBuffer.toString());
  // Find the index of the recipe with the specified id from the request's URL parameters
  const index = recipes.findIndex((recipe) => recipe.id === req.params.id);
  // If the recipe is not found, send a response with a status code of 404
  if (index === -1) {
    res.status(404).send({ message: "Recipe not found" });
    return;
  }
  // Update the recipe at the found index with the new data
  recipes[index] = { ...recipes[index], ...updatedRecipeData };
  // Write the updated recipes data back to the file
  await fs.writeFile(filePath, JSON.stringify(recipes));
  // Send a response with a status code of 200 and the updated recipe data
  res
    .status(200)
    .send({ data: recipes[index], message: "Recipe updated successfully" });
};

//desc Delete recipe
//route DELETE /api/recipes/:id
//access Public
export const deleteRecipe = async (req, res) => {
  // Get the id of the recipe to delete from the request's URL parameters
  const { id } = req.params;
  // Read the contents of the recipes file
  const dataBuffer = await fs.readFile(filePath);
  // Parse the JSON data into a JavaScript object
  const recipes = JSON.parse(dataBuffer.toString());
  // Filter out the recipe with the specified id
  const updatedRecipes = recipes.filter(recipe => recipe.id && recipe.id.toString() !== id);
  try {
    // Write the updated recipes data (without the deleted recipe) back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedRecipes));
    // Send a response with a status code of 200 and a success message
    res.status(200).send({ message: "Recipe deleted successfully" });
  } catch (error) {
    // If an error occurs during file writing, log the error and send a response with a status code of 500
    console.error("Error writing to file:", error);
    res.status(500).send({ message: "Error writing to file" });
  }
};

//desc Subscribe to newsletter
//route POST /api/subscribe
//access Public

export const subscribe = async (req, res) => {
  const { email, name } = req.body;
 
  if (!email || !name) {
    return res.status(400).send({ message: "Email is required" });
  }

 
  const dataBuffer = await fs.readFile(subscriberFilePath);
  const subscribers = JSON.parse(dataBuffer.toString());

 
  if (subscribers.some(subscriber => subscriber.email === email)) {
    return res.status(400).send({ message: "Email already subscribed" });
  }

 
  subscribers.push({ email, name });
  await fs.writeFile(subscriberFilePath, JSON.stringify(subscribers));
  res.status(201).send({ message: "Subscribed successfully" });
};

//desc Add new image
//route POST /api/recipes/:id/images
//access Public






