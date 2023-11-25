import { useState } from "react";
import { register } from "../../services/AuthServices";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState(null);

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const token = await register(username, email, password);
            console.log('Registration successful. Token:', token);
            setRegistrationError("La cuenta se creó con éxito");
        } catch (error) {
            console.error('Registration failed', error);
            setRegistrationError("Error al crear la cuenta, intente de nuevo");
        }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 min-h-screen p-6 sm:p-0 bg-greenish-black'>
            <div className='hidden sm:block'>
                <img className='h-screen w-full' src="/assets/loginImage.jpg" alt="sideImage" />
            </div>

            <div className='flex flex-col justify-center p-6'>
                <form className='max-w-[400px] w-full mx-auto bg-dark-cyan p-8 px-8 rounded-lg' onSubmit={handleRegister}>
                    <h2 className='text-4xl text-white text-center imprima-700'>REGISTRO</h2>
                    <a className="flex w-full justify-center pb-4 text-white imprima-700 italic">MusicBox</a>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="password" placeholder="Contraseña" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <a className="text-center text-xs py-1 px-2">8 caracteres (almenos una mayúscula, una minúscula, un dígito y un caracter especial @#$%^&+=!)</a>
                    </div>
                    <div className='text-center text-slate-300 p-2 imprima-400'>
                        <p>¿Ya tienes una cuenta?{" "}<a href='/login' className='text-light-green underline'>Inicia sesión</a></p>
                    </div>
                    {registrationError && (
                        <div className="text-blue text-sm text-center">{registrationError}</div>
                    )}
                    <button className='w-full my-5 py-2 bg-light-green hover:bg-dark-green active:bg-lightest-green text-white hover:text-white active:text-white imprima-400 rounded-full'>
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}
