const express = require('express');
const router = express.Router();

const { 
    getAllRecipes, 
} = require('../controllers/recipes');

router.route('/').get(getAllRecipes);

module.exports = router;