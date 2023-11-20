import MusicBar from '../../components/Navbars/MusicBar';
import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';

export default function CreatePlaylist() {
    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='flex justify-start w-full lg:px-10 px-15 pb-10 imprima-700'>
                        <a className='text-2xl'>Crear playlist</a>
                    </div>
                    {/* Form */}
                    <div className="w-full sm:w-1/2 lg:w-1/2 bg-dark-cyan rounded-lg p-8 border-2 border-dark-cyan">
                        <form className="flex flex-col gap-8">
                            <input id="title" name="title" type="text" className="w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none" placeholder="Título" required />
                            <textarea id="description" name="description" rows="3" className="w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none" placeholder="Descripción" required />
                            <div className="text-blue text-sm text-center">{/* Aqui va el error del form */}</div>
                            <div className="flex justify-center">
                                <button type="submit" className="btn btn-sm h-9 border-none w-full bg-light-green hover:bg-dark-green active:bg-lightest-green text-white hover:text-white active:text-white imprima-400 rounded-full self-end">
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
