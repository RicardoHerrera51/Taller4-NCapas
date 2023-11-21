import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import PLSongCard from '../../components/SongCards/PLSongCard';
import Titles from '../../components/Titles/Titles';

export default function PlaylistDetails({ songNumber = 20, plTime = "23:33"}) {
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
                            <Titles title='Nombre de playlist' />
                            <div className='flex justify-start w-full lg:px-10 px-15 pb-5 imprima-400'>
                                <a className='text-base'>{songNumber} canciones, {plTime}</a>
                            </div>
                        </div>
                        <div className='lg:px-10 px-15 pt-2'>
                            <SearchBar placeholder='Busca una canción...' />
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
