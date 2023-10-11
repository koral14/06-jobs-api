import React, { useEffect, useState } from 'react';
// import style from './_createRecipe.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Home from '../images/home.png';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

function Create() {
    const [checkbox, setCheckbox] = useState(false);
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [typeOfFood, setTypeOfFood] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');
    const [gluten, setGluten] = useState(null);
    const { recipeId } = useParams(); 

    const isEditing = !!recipeId;
    console.log('is editing in create', isEditing);

    console.log('params:', recipeId);
    
    const [recipe, setRecipe] = useState({
        recipeName: '',
        region: '', 
        typeOfFood: '', 
        ingredients: '', 
        recipeDescription: '', 
        glutenFree: false,
    });


    const editFetch = async () => {
        if(!recipeId) {
            return;
        }
            const token = localStorage.getItem('jwtToken');
            console.log('Token edit:', token);
            
        try {
            const response = await axios.get(`${process.env.REACT_APP_REACT_URL}/api/v1/recipes/${recipeId}`, { // for deployment
            // const response = await axios.get(`http://localhost:3001/api/v1/recipes/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const fetchedRecipe = response.data; // Assuming the fetched data contains the recipe object
            console.log('fetchRec', fetchedRecipe);
            // Populate the recipe state with fetched values
                setName(fetchedRecipe.recipe.recipeName);
                setRegion(fetchedRecipe.recipe.region);
                setTypeOfFood(fetchedRecipe.recipe.typeOfFood);
                setIngredients(fetchedRecipe.recipe.ingredients);
                setDescription(fetchedRecipe.recipe.recipeDescription);
                setGluten(fetchedRecipe.recipe.glutenFree);
            
        } catch (error) {
            console.log('User is not authenticated!');
            return;
        }

        if (!token) {
            console.log('User is not authenticated!');
            return;
        }   
    }

    useEffect( () => {
        editFetch();
    }, [isEditing, recipeId]);

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();        
        
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.log('User is not authenticated!');
                return;
            }

            const formData = new FormData(event.target);
            const request = {};

            for (const [key, value] of formData.entries()) {
                request[key] = value;
            }

            console.log('this is the form data number 1: ', request);

            if (isEditing) {
                const response = await axios.patch(`${process.env.REACT_APP_REACT_URL}/api/v1/recipes/${recipeId}`, request, { // for deployment
                // const response = await axios.patch(`http://localhost:3001/api/v1/recipes/${recipeId}`, request, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        _cache: Date.now(), // unique timestamp
                    }
                });
                console.log('Successfully updated recipe');
                navigate('/loggedIn');
            } else {
                const response = await axios.post(`${process.env.REACT_APP_REACT_URL}/api/v1/recipes`, request, { // for deployment
                // const response = await axios.post(`http://localhost:3001/api/v1/recipes`, request, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        _cache: Date.now(), // unique timestamp
                    }
                });
                console.log('Successfully created recipe');
            
            if (response.status === 201) {
                console.log('Successfully created recipe');
                setName('');
                setRegion('');
                setIngredients('');
                setTypeOfFood('');
                setDescription('');
                setCheckbox(false);
            } else {
                console.log('error');
            }
        }
            
        } catch (error) {
            console.error(error);
            console.error(error.response.data)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    return (
        <>
            <Link to="/loggedIn"><img className='home-icon' src={Home} alt="Home Page" title="Home Page" /></Link>
            <Link to="/login" onClick={handleLogout} className="log-out-a">
                <button className='log-out-button' title='Logout'>
                    <i className="fa fa-sign-out"></i>
                </button>
            </Link>
            <h1 className='h1-create'>Add a recipe</h1>
            <form className='container-form-create' onSubmit={handleFormSubmit}>
                <label className='label-create' htmlFor='recipeName'>Recipe name:</label>
                <input 
                    className='input-create' 
                    name='recipeName' 
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className='label-create' htmlFor='region'>Region:</label>
                <input 
                    className='input-create' 
                    name='region' 
                    type='text' 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                /><br/><br/>

                <label className='label-create'>Recipe type:</label>
                <select className='dropdown-create' name='typeOfFood' type='text' >
                    <option value="" disabled>Recipe type:</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                </select><br/>

                <label className='label-create' htmlFor='ingredients'>Ingredients:</label>
                <textarea 
                    type='text' 
                    name='ingredients' 
                    id="ingredients-textarea" 
                    rows="3" 
                    cols="1"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                ></textarea>

                <label className='label-create' htmlFor='recipeDescription'>Description:</label>
                <textarea 
                    type='text' 
                    id="description-textarea" 
                    name="recipeDescription" 
                    rows="5" 
                    cols="1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                
                <label className='label-create' htmlFor='glutenFree' >Gluten free:</label>
                <div className='container-checkbox'>
                    <input 
                        className='checkbox-create' 
                        type="checkbox" 
                        name='glutenFree'
                        checked={checkbox} 
                        onChange={() => {setCheckbox(!checkbox)}}
                    />
                </div>

                <button className="button-30" variant="primary" type="submit">
                    Submit
                </button><br />
            </form>      
        </>
    )
}

export default Create;