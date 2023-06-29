import loginImage from '../../assets/loginImage.jpg'
import { useState } from 'react';
import FetchServices from '../../services/FetchServices';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Call the login function from FetchServices
        FetchServices.login(identifier, password)
            .then((response) => {
                // Handle the response (e.g., store the token, redirect to another page)
                console.log('Petition processed');

                // Check if the authentication was successful
                if (response) {
                    // Redirect to the songs page after successful login
                    console.log('Login successful');
                    localStorage.setItem('token', response);
                    navigate('/all-songs');
                } else {
                    // Handle authentication failure (e.g., display an error message)
                    console.error('Authentication failed');
                }
            })
            .catch((error) => {
                // Handle login error (e.g., display an error message)
                console.error('Login error:', error);
            });
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='h-screen w-full' src={loginImage} alt="" />
            </div>

            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleFormSubmit}>
                    <h2 className='text-4xl dark:text-white font-bold text-center '>
                        LOG IN
                    </h2>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"
                            value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='text-center text-gray-400 p-2'>
                        <p>Do not have an account?{" "}<a href='/register' className='text-teal-500 underline'>Register here</a></p>
                    </div>

                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                        onClick={handleFormSubmit}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}