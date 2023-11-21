export default function Login() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 min-h-screen p-6 sm:p-0 bg-greenish-black'>
            <div className='hidden sm:block'>
                <img className='max-h-screen w-full' src="/assets/loginImage.jpg" alt="sideImage" />
            </div>

            <div className='bg-gray-800 flex flex-col justify-center p-6'>
                <form className='max-w-[400px] w-full mx-auto bg-dark-cyan p-8 px-8 rounded-lg' >
                    <h2 className='text-4xl text-white font-bold text-center imprima-700'>LOG IN</h2>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="text" placeholder="Usuario" required/>
                    </div>
                    <div className='flex flex-col text-white py-2 imprima-400'>
                        <input className='w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none' type="password" placeholder="Contraseña" required/>
                    </div>
                    <div className='text-center text-slate-300 p-2 imprima-400'>
                        <p>¿No tienes una cuenta?{" "}<a href='/register' className='text-light-green underline'>Registrate aqui</a></p>
                    </div>
                    <button className='w-full my-5 py-2 bg-light-green hover:bg-dark-green active:bg-lightest-green text-white hover:text-white active:text-white imprima-400 rounded-full'>
                        Inicia sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
