import MusicBar from '../../components/Navbars/MusicBar';
import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';

export default function Profile() {
    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='flex justify-start w-full lg:px-10 px-15 pb-4 imprima-700'>
                        <a className='text-2xl'>Mi Perfil</a>
                    </div>
                    {/* Profile details */}
                    <section className='grid lg:grid-cols-2 w-full justify-center gap-14 lg:gap-0 lg:px-10 px-15 pb-10'>
                        <div className='flex flex-col items-center gap-8 w-56'>
                            <div className="avatar">
                                <div className="w-40 lg:w-56 rounded-full border-2 border-gray">
                                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" />
                                </div>
                            </div>
                            <button type='button' className="btn btn-sm w-40 h-9 lg:w-56 imprima-400 text-white hover:text-white active:text-white bg-light-green hover:bg-darkest-green active:bg-dark-green border-none rounded-full">Editar foto</button>
                        </div>
                        <div className='flex flex-col justify-center items-center lg:items-start text-xl imprima-400 text-white lg:text-2xl lg:p-0'>
                            <a>usuario</a>
                            <a>correo@electronico.com</a>
                        </div>
                    </section>
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
