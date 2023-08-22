const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    recipeName:{
        type: String,
        required:[true, 'Recipe name:'],
        maxlength: 50,
        unique: true
    },
    region:{
        type: String,
        required:[true, 'Prease provide the region where this recipe comes from'],
        maxlength: 50
    },
    typeOfFood: {
        type: String,
        required:[true, 'Prease select one of the following:'],
        enum: ['Lunch', 'Dinner', 'Snack', 'Dessert']
    },
    ingredients:{
        type: String,
        maxlength: 250,
        required:[true, 'Please indicate the required ingredients']
    },
    recipeDescription: {
        type: String,
        required:[true, 'Please provide the description of the recipe:']
    },
    glutenFree: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', RecipeSchema)