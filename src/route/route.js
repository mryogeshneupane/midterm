// File name: route.js
// Student’s Name: Yogesh neupane
// StudentID: 200570557
// Date: 2023/02/23


const express = require('express');
const router = express.Router();
const Recipe = require('../model/model.js'); 
const controller = require('../controller/controller.js');

// get all recipes
router.get('/recipes', controller.getAllRecipe);

// all ingredients
router.get('/ingredients', controller.getAllIngredients);

// recipe by cuisine
router.get('/recipes/cuisine/:cuisine', controller.getRecipesByCuisine);

// details about recipe
router.get('/recipe/:recipeId',  controller.findRecipe);

// profile information about ingredients
router.get('/ingredient/:ingredientName', controller.getIngredientProfile);




module.exports = router;
