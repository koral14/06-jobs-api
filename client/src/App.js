import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/Home';
import Login from './Components/Login/Login';
import './sass/app.scss';
import SignUp from './Components/SignUp/SignUp';
import Create from './Components/CreateRecipe/createRecipe';
import HomeLoggedIn from './Components/HomeForLoggedIn/HomeLoggedIn';
import { AuthProvider } from './Components/AuthContext/AuthContext';

export const InputContext = createContext({})

const App = () => {
  const [inputs, setInputs] = useState({}); // Initialize inputs as an empty object


return (
  <>
    <AuthProvider>
      <InputContext.Provider value={[inputs, setInputs]}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:recipeId" element={<Create />} />
            <Route path="/loggedIn" element={<HomeLoggedIn />} />
          </Routes>
        </Router>
      </InputContext.Provider>
    </AuthProvider>
  </>
);
};

export default App;