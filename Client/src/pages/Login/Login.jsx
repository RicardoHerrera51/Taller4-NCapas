import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthServices";
import { useState } from "react";

export default function Login({onLogin}) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await login(identifier, password);

            if (token) {
                localStorage.setItem('token', token);
                onLogin();
                setLoginError("Inicio de sesión exitoso");
                navigate('/');
            } else {
                console.log('Login failed. Invalid credentials.');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setLoginError("Error al iniciar sesión, intente de nuevo");
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 min-h-screen p-6 sm:p-0 bg-greenish-black'>
            <div className='hidden sm:block'>
                <img className='h-screen w-full' src="/assets/loginImage.jpg" alt="sideImage" />
            </div>

            <div className='bg-gray-800 flex flex-col justify-center p-6'>
                <form className='max-w-[400px] w-full mx-auto bg-dark-cyan p-8 px-8 rounded-lg' onSubmit={handleLogin}>
                    <h2 className='text-4xl text-white text-center imprima-700'>LOG IN</h2>
                    <a className="flex w-full justify-center pb-4 text-white imprima-700 italic">MusicBox</a>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="text" placeholder="Usuario" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
                    </div>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='text-center text-slate-300 p-2 imprima-400'>
                        <p>¿No tienes una cuenta?{" "}<a href='/register' className='text-light-green underline'>Registrate</a></p>
                    </div>
                    {loginError && (
                        <div className="text-blue text-sm text-center">{loginError}</div>
                    )}
                    <button className='w-full my-5 py-2 bg-light-green hover:bg-dark-green active:bg-lightest-green text-white hover:text-white active:text-white imprima-400 rounded-full' onClick={handleLogin}>
                        Inicia sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
