import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';
import Titles from '../../components/Titles/Titles';
import { createPlaylist } from '../../services/songService';
import { useState } from 'react';

export default function CreatePlaylist() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [registrationError, setRegistrationError] = useState(null);

    const handleCreate = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const playlist = await createPlaylist(token, title, description);
            
            setRegistrationError("La playlist se creó con éxito", playlist);
        } catch (error) {
        console.error("Error creating playlist:", error);
        setRegistrationError(error.message);
    }
};

return (
    <div className="drawer lg:drawer-open bg-greenish-black">
        <input type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col max-h-screen">
            {/* Mobile navbar and music player bar */}
            <MobNavbar />

            {/* Contenido*/}
            <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                <Titles title='Crear Playlist' />
                {/* Form */}
                <div className="w-full sm:w-1/2 lg:w-1/2 bg-dark-cyan rounded-lg p-8 mt-4">
                    <form onSubmit={handleCreate} className="flex flex-col gap-8">
                        <input id="title" name="title" type="text" className="w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <textarea id="description" name="description" rows="3" className="w-full py-2 px-3 bg-light-cyan text-white rounded-lg focus:outline-none" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        {registrationError && (
                            <div className="text-blue text-sm text-center">{registrationError}</div>
                        )}
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
