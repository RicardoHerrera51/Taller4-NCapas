import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import PLSongCard from '../../components/SongCards/PLSongCard';

export default function PlaylistDetails() {
    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='grid md:grid-flow-col lg:justify-between items-start w-full pb-5 gap-10'>
                        <div className='flex flex-col order-last md:order-none items-center gap-2'>
                            <div className='flex justify-start w-full lg:pl-10 px-15 imprima-700'> {/* Hacer dinamico el pb */}
                                <a className='text-2xl'>Nombre de playlist</a>
                            </div>
                            <div className='flex justify-start w-full lg:px-10 px-15 pb-5 imprima-400'>
                                <a className='text-base'>20 canciones, 23:33</a>
                            </div>
                        </div>
                        <div className='lg:px-10 px-15 pt-2'>
                            <SearchBar />
                        </div>
                    </div>
                    {/* Display of songs in the playlist */}
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                    <PLSongCard />
                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
