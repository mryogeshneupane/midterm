// File name: model.js
// Student’s Name: Yogesh neupane
// StudentID: 200570557
// Date: 2023/02/23

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining recipe schema 
const RecipeSchema = new Schema({
    recipeId: {type: Number},
    title: {type: String},
    cuisine: {type: String},
    ingredients:  [{type: String}],
    instructions: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    
})

RecipeSchema.statics.findByCuisine = async function(cuisine) {
    return this.find({ cuisine: cuisine });
};

const Recipes = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipes;