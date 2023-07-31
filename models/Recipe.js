const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    region:{
        type: String,
        required:[true, 'Prease provide the region where this recipe comes from'],
        maxlength: 50
    },
    mainIngredient:{
        type: String,
        maxlength: 50
    },
    typeOfFood: {
        type: String,
        required:[true, 'Prease indicate what type of food is this'],
        enum: ['Lunch', 'Dinner', 'Snack', 'Dessert']
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