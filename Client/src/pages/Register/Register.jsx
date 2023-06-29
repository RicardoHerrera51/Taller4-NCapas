import { useState } from 'react';
import loginImage from '../../assets/loginImage.jpg'
import FetchServices from '../../services/FetchServices';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationError, setRegistrationError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await FetchServices.register(username, email, password);
            if (token) {
                // Registration successful, handle further actions (e.g., redirect to a new page)
                setRegistrationError("Account created");
            }
        } catch (error) {
            console.log(error);
            setRegistrationError(error.message);
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='h-screen w-full' src={loginImage} alt="" />
            </div>

            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleFormSubmit}>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>
                        REGISTER
                    </h2>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Username</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text'
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Email</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='email'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {registrationError && (
                        <div className="text-red-500 text-sm mb-2 text-center">{registrationError}</div>
                    )}

                    <div className='text-center text-gray-400 p-2'>
                        <p>You already have an account?{" "}<a href='/login' className='text-teal-500 underline'>Log in here</a></p>
                    </div>

                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register