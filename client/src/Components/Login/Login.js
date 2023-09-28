import React, { useState } from 'react';
import style from './_Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../images/home.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) =>  {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/login',  
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, 
        }
      );
      console.log('Response in Login page:', response);
      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          console.log('Token:', token);
          navigate('/loggedIn');
        } else {
          console.log('Token not found in the response');
        }
      } else {
        console.log('Login failed');
      }
    } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Login failed: Incorrect credentials')
          console.log('Login failed: Incorrect credentials');
          // display an error message to the user here

        } if (error.response && error.response.status === 500) {
          console.log('The processing of the request on the server failed unexpectedly');
        } else {
          console.error('Error:', error);
        }
    }    
  };

  return (
    <>
      <Link to="/"><img className='home-icon' src={Home} alt="Home Page" title="Home Page" /></Link>
      <form className="form-container-login" onSubmit={handleLogin}>
        <div className="email-login">
          <label className="label-email">Email address:</label><br/>
          <input 
            className="form-inputs-login" 
            type="email" 
            placeholder="Enter email" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="email-login">
          <label className="label-email">Password:</label><br/>
          <input 
            className="form-inputs-login" 
            type="password" 
            placeholder="************" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button-30" variant="primary" type="submit" >
          Submit
        </button>

        <p className="link-to-sign-up">
          Don't have an account yet?{' '}
          <Link to="/sign-up"> Create one.</Link><br/><br/>
        </p>
      </form>
    </>
    
  );
}

export default Login;