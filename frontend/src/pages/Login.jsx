import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let endpoint, payload;
      if (currentState === 'Sign Up') {
        endpoint = '/api/user/register';
        payload = { name, email, password };
      } else {
        endpoint = '/api/user/login';
        payload = { email, password };
      }

      const response = await axios.post(backendUrl + endpoint, payload);
      if (response.data.success) {
        if (currentState === 'Sign Up') {
          // Switch to login state after successful sign-up
          setCurrentState('Login');
          toast.success('Sign up successful! Please log in.');
        } else {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          // Display welcome message with the user's name
          toast.success(`Welcome`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const toggleState = () => {
    setCurrentState((prevState) => (prevState === 'Sign Up' ? 'Login' : 'Sign Up'));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-gray-800 p-6 bg-gray-100 border rounded-lg shadow-md transition-opacity duration-500 ease-in-out opacity-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-3xl font-semibold transition-transform duration-500 ease-in-out transform translate-y-0">
          {currentState}
        </h2>
        <hr className="border-none h-[2px] w-10 bg-gray-800" />
      </div>
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-800 rounded-md transition-opacity duration-500 ease-in-out opacity-100"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-4 py-2 border border-gray-800 rounded-md transition-opacity duration-500 ease-in-out opacity-100"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-800 rounded-md transition-opacity duration-500 ease-in-out opacity-100"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p
          onClick={toggleState}
          className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          {currentState === 'Login' ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
        </p>
      </div>
      <button
        type="submit"
        className="bg-black text-white font-medium px-8 py-2 mt-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
