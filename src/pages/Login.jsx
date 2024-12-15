// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../stores/auth';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            // Send login request using axios.post
            const response = await axios.post('https://admin.glorebd.com/api/login', {
                phone: email,
                pass: password,
            });

            // Assuming the response is successful
            const data = response.data;

            if (data.status) {
                // Dispatch the action to store the user data and token in Redux
                dispatch(loginSuccess({
                    user: { user_id: data.data.user_id },  // You can add more user data here
                    token: data.data.token,
                }));

                // Redirect to the admin panel or another protected page
                navigate('/admin');
            } else {
                // Handle failed login (e.g., show an error message)
                console.error(data.error);
                setEmailError(data.error.phone);
                setPasswordError(data.error.pass);
            }
        } catch (error) {
            // Handle errors (e.g., network errors, server errors)
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mx-auto sm:max-w-96 text-gray-800 px-2 sm:px-0 mt-10">
            <form onSubmit={handleLogin}>
                <div className="flex-1 space-y-5">
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className='font-prata text-3xl capitalize'>Login</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                    </div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
                    {emailError && <span className='text-red-600'>{emailError}</span>}
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
                    {passwordError && <span className='text-red-600'>{passwordError}</span>}
                    <button type='submit' className='bg-black text-white text-sm my-4 px-8 py-3 rounded capitalize text-center justify-center w-full'>Login</button>
                </div>
            </form >
        </div >
    )
}

export default Login