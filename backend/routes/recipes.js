const express = require('express');
const router = express.Router();

const { 
    // getAllRecipes, 
    getRecipe, 
    createRecipe, 
    updateRecipe, 
    getUserRecipes,
    deleteRecipe, 
} = require('../controllers/recipes');

router.route('/').post(createRecipe).get(getUserRecipes);

router.route('/:id').get(getRecipe).delete(deleteRecipe).patch(updateRecipe);

// router.patch('/:id', updateRecipe);

module.exports = router;