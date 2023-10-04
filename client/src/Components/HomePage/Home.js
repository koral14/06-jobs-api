import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleRecipe from '../singleRecipe/singleRecipe';
import CreateAccount from '../images/createAccount.png';
import Footer from '../Footer/Footer';

const arrowUp = '▲';
const arrowDown = '▼';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sorted, setSorted] = useState(false); 
    console.log('recipes line 28', recipes);
console.log(import.meta.env.REACT_URL);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`${import.meta.env.REACT_URL}`, { // replaced: await axios.get('http://localhost:3001/api/v1/recipesAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {

                    if (Array.isArray(response.data.recipes)) {
                        setRecipes(response.data.recipes);
                        setLoading(false);                        
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
                    <Link to="/login"><img className='createAccount' src={CreateAccount} alt="Log in" title="Log In" /></Link>
                </div>
                <h1 className='h1'>Cook Yummy</h1><br/>
            </nav>
            <div className='cards-home'>
                {loading ? (
                    <p className='loading-home'>Loading...</p>
                ) : (
                    <div>
                        <div className='sort-container'>
                        { sorted ? (
                            <button onClick={handleAscending} className='button-sort'>Sort by date: {arrowUp}</button>
                        ) : (
                            <button onClick={handleDescending} className='button-sort'>Sort by date: {arrowDown}</button>
                        )}
                        </div><br/>

                        <ul className='ul-home'>
                            {recipes.map((recipe) => (
                                <SingleRecipe 
                                    key={recipe._id}
                                    recipe={recipe}
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

export default Home;