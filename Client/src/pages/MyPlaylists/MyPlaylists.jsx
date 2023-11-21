import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function MyPlaylists() {
    const navigate = useNavigate();

    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='grid md:grid-flow-col lg:justify-between items-center w-full pb-5 gap-10'>
                        <div className='flex flex-row order-last md:w-60 md:order-none items-center gap-2'>
                            <div className='flex justify-start w-full lg:pl-10 px-15 imprima-700'> {/* Hacer dinamico el lg:pl  */}
                                <a className='text-2xl'>Mis playlists</a>
                            </div>
                            <button onClick={() => navigate('/create-pl')} className="btn btn-xs h-8 w-8 ml-1 rounded-full border-none bg-light-green hover:bg-darkest-green active:bg-dark-green">
                                <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
                            </button>
                        </div>
                        <div className=' lg:px-10 px-15'>
                            <SearchBar />
                        </div>
                    </div>
                    {/* Display of created playlists */}
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
