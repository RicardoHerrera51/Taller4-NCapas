import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import SongCard from '../../components/SongCards/SongCard';
import Titles from '../../components/Titles/Titles';

export default function Home({ user = "usuario" }) {
  const token = localStorage.getItem('token');

  return (
    <div className="drawer lg:drawer-open bg-greenish-black">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col max-h-screen">
        {/* Mobile navbar and music player bar */}
        <MobNavbar />
        <MusicBar />

        {/* Contenido*/}
        <main className="lg:flex-1 h-screen  lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
          <div className='flex lg:flex-row flex-col w-full imprima-700 lg:px-10 px-15 justify-between lg:items-center gap-4 pb-6'>
            <a className='text-2xl'>Hola, {user}</a>
            <SearchBar placeholder='Busca una cancion...' />
          </div>
          <Titles title='Canciones' />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
        </main>
      </div>

      {/* Sidebar on web */}
      <Sidebar />
    </div>
  )
}