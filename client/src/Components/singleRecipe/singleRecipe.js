import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breakfast from '../images/Breakfast.avif';
import Dessert from '../images/Dessert.jpg';
import Dinner from '../images/Dinner.avif';
import Lunch from '../images/Lunch.avif';
import Snacks from '../images/Snacks.avif';
import glutenFreeIcon from '../images/glutenFree.png';
import DeleteIcon from '../images/delete.png';
import EditIcon from '../images/edit.png';

const SingleRecipe = ({ recipe, handleDeleteRecipe, authenticatedUser }) => {
    const breakfastFood = recipe.typeOfFood === 'Breakfast';
    const dessertFood = recipe.typeOfFood === 'Dessert';
    const dinnerFood = recipe.typeOfFood === 'Dinner';
    const lunchFood = recipe.typeOfFood === 'Lunch';
    const snackFood = recipe.typeOfFood === 'Snack';
    const [isReadMore, setIsReadMore] = useState(true);
    console.log('recipe on line 19 in singleRecipe', recipe);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    useEffect(() => {
        // When the authenticatedUser state changes, this will re-render the component
    }, [authenticatedUser]);

    const limitedDescription = isReadMore
        ? `${recipe.recipeDescription.slice(0, 200)}${recipe.recipeDescription.length > 200 ? '...' : ''}`
        : recipe.recipeDescription;

    const isRecipeOwner = authenticatedUser && authenticatedUser.userId === recipe.createdBy;

    if (isRecipeOwner) {
        console.log('is recipe owner true', isRecipeOwner)
    } else {
        console.log('not recipe owner');
    }

    console.log('authenticatedUser in SingleRecipe:', authenticatedUser);
    
    console.log('isRecipeOwner in singleRecipe:', isRecipeOwner);
    console.log('recipe id line 44', recipe._id);

    return (
        <div className={`container-single ${isReadMore ? '' : 'expanded'}`}>
            <div className='one'>
                <h3 className='single-name'>{recipe.recipeName}</h3>
                <div className='region-gluten'>
                    <h2 className='single-region'>{recipe.region}</h2>
                    <p>{recipe.glutenFree === 'false' ? <img className='gluten-single' src={glutenFreeIcon} alt="Gluten free" title="Gluten free" /> : ""}</p>
                </div>
                <p className='ingredients-single'>Ingredients: {recipe.ingredients}</p>
                {breakfastFood ? <img className='image-single' src={Breakfast} alt="Breakfast" title="Breakfast" /> : '' }
                {dessertFood ? <img className='image-single' src={Dessert} alt="Dessert" title="Dessert" /> : '' }
                {dinnerFood ? <img className='image-single' src={Dinner} alt="Dinner" title="Dinner" /> : '' }
                {lunchFood ? <img className='image-single' src={Lunch} alt="Lunch" title="Lunch" /> : '' }
                {snackFood ? <img className='image-single' src={Snacks} alt="Snacks" title="Snacks" /> : '' }
                <div className={`description-single ${isReadMore ? '' : 'expanded'}`}>
                    {limitedDescription}
                </div>
                <span onClick={toggleReadMore} className="read-or-hide">
                    {isReadMore ? "...read more" : "..show less"}
                </span>
            </div>
            {/* Delete and edit buttons for logged-in users */}
            <div className='two'>
                {authenticatedUser !== null ? (
                    <div className='edit-and-del-btn'>
                        <button className='remove-btn' 
                            data-id='delete the recipe'
                            type='button'
                            onClick={() => handleDeleteRecipe(recipe._id)}>
                                <img className='delete-single' src={DeleteIcon} alt="Delete" title="Delete" />
                        </button>
                        <button className='edit-button'>
                            <Link to={`/${recipe._id}`}>
                                <img className='edit-single' src={EditIcon} alt="Edit button" title="Edit" />
                            </Link>
                        </button>
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}

export default SingleRecipe;

