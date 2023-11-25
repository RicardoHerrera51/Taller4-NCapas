import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MobNavbar from '../../components/Navbars/MobNavbar';
import Sidebar from '../../components/Navbars/Sidebar';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Titles from '../../components/Titles/Titles';
import { getPlaylist } from "../../services/songService";
import { useEffect, useState } from "react";
import Loader from '../../components/Loader/Loader';


export default function MyPlaylists() {
  
  const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  
  const [filterValue, setFilterValue] = useState("");


  const getData = async () => {
    try {
      setLoading(true);
    let response = await getPlaylist(token);
    if (response) {
        setPlaylists(response.content);
        console.log(response.content);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

const handleSearchButtonClick = (inputValue) => {
  setFilterValue(inputValue);
};


const filteredPlaylists = playlists.filter((playlist) =>
playlist.title.toLowerCase().includes(filterValue.toLowerCase())
);


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="drawer lg:drawer-open bg-greenish-black">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col max-h-screen">
        {/* Mobile navbar */}
        <MobNavbar />

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='grid md:grid-flow-col lg:justify-between items-center w-full pb-5 gap-10'>
                        <div className='flex flex-row order-last md:w-60 md:order-none items-center gap-2'>
                            <Titles title='Mis Playlists' />
                            <button onClick={() => navigate('/create-pl')} className="btn btn-xs h-8 w-8 ml-1 rounded-full border-none bg-light-green hover:bg-darkest-green active:bg-dark-green">
                                <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
                            </button>
                        </div>
                        <div className=' lg:px-10 px-15'>
                            <SearchBar onSearch={handleSearchButtonClick} placeholder='Busca una playlist...' />
                        </div>
                    </div>
                    {/* Display of created playlists */}
                    
                    {loading && <Loader />} 
                    {filteredPlaylists.map((playlist) => (
                 <PlaylistCard key={playlist.code} getData={getData} code={playlist.code} title={playlist.title} duration={playlist.totalDuration} description={playlist.description}/>
              ))}
                </main>
            </div>
          

      {/* Sidebar on web */}
      <Sidebar />
    </div>
  )
}