const Recipe = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllRecipes = async (req, res) => {
    res.send('get all Recipe');
};

const getRecipe = async (req, res) => {
    res.send('get single recipe');
};

const createRecipe = async (req, res) => {
    req.body.createdBy = req.user.userId
    const recipe = await Recipe.create(req.body)
    res.status(StatusCodes.CREATED).json({ recipe })
};

const updateRecipe = async (req, res) => {
    res.send('update Recipe');
};

const deleteRecipe = async (req, res) => {
    res.send('delete Recipe');
};

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}