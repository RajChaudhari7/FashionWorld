import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-r from-orange-300 to-yellow-200">
            <div className="bg-white shadow-2xl rounded-2xl px-10 py-8 max-w-md w-full transform transition-transform duration-300 hover:scale-105">
                <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="rounded-lg w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            type="email"
                            placeholder="your@gmail.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="rounded-lg w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        className="w-full py-3 px-6 rounded-lg text-white bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 transition-colors duration-300"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
