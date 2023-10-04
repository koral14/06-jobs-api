const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    recipeName:{
        type: String,
        required:[true, 'Recipe name missing'],
        maxlength: 50,
        unique: true
    },
    region:{
        type: String,
        required:[true, 'What region this recipe comes from?'],
        maxlength: 50
    },
    typeOfFood: {
        type: String,
        required:[true, 'Please select from the options below'],
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
    },
    ingredients:{
        type: String,
        maxlength: 650,
        required:[true, 'Ingredients field empty']
    },
    recipeDescription: {
        type: String,
        maxlength: 1100,
        required:[true, 'Description of the recipe missing']
    },
    glutenFree: {
        type: String,
        default: false,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', RecipeSchema)