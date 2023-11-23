import { useEffect, useState } from "react";
import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import SongCard from '../../components/SongCards/SongCard';
import Titles from '../../components/Titles/Titles';
import { infoProfile } from '../../services/AuthServices';
import { getSongs } from "../../services/songService";

export default function Home() {
  const token = localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState({ username: "usuario" });
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [filterValue, setFilterValue] = useState("");


  const getuserData = async () => {
    try {
      const userInfo = await infoProfile(token);

      setUserInfo(userInfo);
    } catch (error) {
      console.error('An error occurred while getting the username info:', error);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      let response = await getSongs(token);
      if (response) {
        setSongs(response.content);
        console.log(response.content);
      }
    } catch (error) {
      console.error('An error occurred while getting data:', error);
    }
  };

  useEffect(() => {
    getData();
    getuserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchButtonClick = (inputValue) => {
    setFilterValue(inputValue);
  };

  const handleSelectedSong = (song) => {
    console.log(song);
    setSelectedSong(song);
  };


  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(filterValue.toLowerCase())
  );


  return (
    <div className="drawer lg:drawer-open bg-greenish-black">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col max-h-screen">
        {/* Mobile navbar and music player bar */}
        <MobNavbar />
        <MusicBar song={selectedSong} />

        {/* Contenido*/}
        <main className="lg:flex-1 h-screen  lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
          <div className='flex lg:flex-row flex-col w-full imprima-700 lg:px-10 px-15 justify-between lg:items-center gap-4 pb-6'>

            <a className='text-2xl'>Hola, {userInfo.username}</a>
            <SearchBar onSearch={handleSearchButtonClick} onChange={(e) => setFilterValue(e.target.value)}
              value={filterValue} placeholder='Busca una cancion...' />

          </div>
          <Titles title='Canciones' />
          {filteredSongs.map((song) => (
            <SongCard onClick={() => handleSelectedSong(song)} key={song.code} code={song.code} cover={song.album_cover} artist={song.artist} song={song.title} duration={song.duration} />
          ))}
        </main>
      </div>

      {/* Sidebar on web */}
      <Sidebar />
    </div>
  )
}