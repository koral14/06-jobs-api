const Recipe = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ recipes, count: recipes.length })
};

const getRecipe = async (req, res) => {
    const { 
        user: { userId }, // located in the request (req), comes from auth middleware
        params: { id: recipeId } // located in rec, comes from params
    } = req // recipeId is an alias/other name
    
    const recipe = await Recipe.findOne({
        _id:recipeId, createdBy:userId
    })
    if (!recipe) {
        throw new NotFoundError(`no recipe with id ${recipeId}`)
    }
    res.status(StatusCodes.OK).json({ recipe })
};

const createRecipe = async (req, res) => {
    req.body.createdBy = req.user.userId
    const recipe = await Recipe.create(req.body)
    res.status(StatusCodes.CREATED).json({ recipe })
};

const updateRecipe = async (req, res) => {
    const { 
        body: { recipeName, region, typeOfFood, ingredients, recepeDescription, glutenFree },
        user: { userId }, 
        params: { id: recipeId } 
    } = req
    
    if (recipeName === '', region === '', typeOfFood === '', ingredients === '', recepeDescription ==='') {
        throw new BadRequestError('Fields cannot be empty!')
    }
    const recipe = await Recipe.findByIdAndUpdate(
        { _id: recipeId, createdBy: userId }, 
        req.body,
        { new: true, runValidators: true }
    )
    if (!recipe) {
        throw new NotFoundError(`no recipe with id ${recipeId}`)
    }
    res.status(StatusCodes.OK).json({ recipe })
};

const deleteRecipe = async (req, res) => {
    const { 
        user: { userId }, 
        params: { id: recipeId } 
    } = req

    const recipe = await Recipe.findOneAndDelete(
        { _id: recipeId, createdBy: userId }
    )
    if (!recipe) {
        throw new NotFoundError(`no recipe with id ${recipeId}`)
    }
    res.status(StatusCodes.OK).send({msg: "recipe deleted"})
};

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}