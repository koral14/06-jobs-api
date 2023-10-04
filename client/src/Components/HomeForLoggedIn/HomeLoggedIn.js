import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SingleRecipe from '../singleRecipe/singleRecipe';
import CreateAccount from '../images/createAccount.png';
import CreateRecipe from '../images/createRecipe.avif';
import Footer from '../Footer/Footer';
import { useAuth } from '../AuthContext/AuthContext';

const arrowUp = '▲';
const arrowDown = '▼';

const HomeLoggedIn = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authenticatedUser, login } = useAuth(); 
    const navigate = useNavigate();
    const [sorted, setSorted] = useState(false);   

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        // Navigate to the login route after removing the token
        navigate('/login');
    };

    console.log('authenticatedUser in Home page', authenticatedUser);
    console.log('login is', login);
    console.log('recipes line 28', recipes);

    const handleDeleteRecipe = async (recipeId) => {
        const newState = [...recipes].filter((recipeElement) => recipeElement._id !== recipeId);
        setRecipes(newState);
    
        try {
            const token = localStorage.getItem('jwtToken');
            
            const response = await axios.delete(`http://localhost:3001/api/v1/recipes/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 204) {
                console.log('Recipe deleted successfully on the server');
            } else {
                console.error('Failed to delete recipe on the server');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:3001/api/v1/recipes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {

                    if (Array.isArray(response.data.recipes)) {
                        setRecipes(response.data.recipes);
                        setLoading(false);
                        // add user data to AuthContext if available
                        if (response.data.user) {
                            login(response.data.user);
                        }
                        
                    } else {
                        setLoading(false);
                    }
                    console.log('API Response:', response.data);
                } else {
                    console.error('Failed to fetch recipes');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []); // empty dependency array because this effect runs once when the component mounts;

    console.log('recipes line 88', recipes);

    const handleDescending = () => {
        const listToBeSorted = ([...recipes]);
        listToBeSorted.sort((a, b) => {
            return b.createdAt.localeCompare(a.createdAt);  
        });
        setRecipes(listToBeSorted); 
        setSorted(true);
    }

    const handleAscending = () => {
        const listToBeSorted = ([...recipes]);
        listToBeSorted.sort((a, b) => {
            return a.createdAt.localeCompare(b.createdAt);    
        });
        setRecipes(listToBeSorted);
        setSorted(false);
    }
   
    return (
        <>
            <nav className='nav-home'>
                <div className='right'>
                    {authenticatedUser ? 
                        <Link to="/login" onClick={handleLogout}><button className='log-out-button' title='Logout'><i className="fa fa-sign-out"></i></button></Link>
                    : 
                        <Link to="/login"><img className='createAccount' src={CreateAccount} alt="Log in" title="Log In" /></Link>
                    }
                </div>
                
                <h1 className='h1'>Cook Yummy</h1>
                <div className='left'>
                    {authenticatedUser ? 
                        <Link to="/create"><img className='create-recipe' src={CreateRecipe} alt="Create recipe" title="Create Recipe" /></Link>
                    :
                        null
                    }
                </div>
                
            </nav>
            <div className='cards-home'>
                {loading ? (
                    <p className='loading-home'>Loading...</p>
                ) : (
                    <div>
                        <div className='sort-container'>
                            <label className='sort-label'>Sort by date: 
                                { sorted ? (
                                    <button onClick={handleAscending} className='button-sort'>{arrowUp}</button>
                                ) : (
                                    <button onClick={handleDescending} className='button-sort'>{arrowDown}</button>
                                )}
                            </label>
                        </div><br/>

                        <ul className='ul-home'>
                            {recipes.map((recipe) => (
                                <SingleRecipe 
                                    key={recipe._id}
                                    recipe={recipe}
                                    authenticatedUser={authenticatedUser}
                                    handleDeleteRecipe={handleDeleteRecipe}
                                />                       
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default HomeLoggedIn;