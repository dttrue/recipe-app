import express from "express";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  updateRecipe,
  subscribe,
} from "../controllers/recipes.js";

const router = express.Router();

//desc Get all recipes and add new recipe
router.route("/")
.get(getRecipes)
.post(addRecipe);

//desc Get single recipe and update recipe
router.route("/:id")
.get(getRecipe)
.put(updateRecipe)
.delete(deleteRecipe);

//desc Subscribe
router.route
("/subscribe")
.post(subscribe);

export default router;
