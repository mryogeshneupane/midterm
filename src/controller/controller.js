// File name: controller.js
// Student’s Name: Yogesh neupane
// StudentID: 200570557
// Date: 2023/02/23


const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('../model/model');

exports.getAllRecipe = async(req, res)=>{
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
};

exports.getAllIngredients = async(req, res)=>{
    try{
        const ingredients = await Recipe.distinct('ingredients')
        res.json(ingredients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
};

exports.getRecipesByCuisine = async (req, res) => {
    const cuisine = req.params.cuisine;
    
    try {
        const recipes = await Recipe.findByCuisine(cuisine);
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.findRecipe = async (req, res) => {
    try {
      const id = req.params.recipeId;
      const findRecipe = await Recipe.findById(id);
      if (!findRecipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(findRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

exports.getIngredientProfile = async (req, res) => {
    const ingredientName = req.params.ingredientName;
    try {
        const recipes = await Recipe.find({ ingredients: { $regex: new RegExp(ingredientName, 'i') } });
        const ingredientProfile = {
            name: ingredientName,
            usageInRecipes: recipes.map(recipe => recipe.title)
            
        };
        res.status(200).json(ingredientProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
