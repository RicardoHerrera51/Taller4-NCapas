import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-2 px-2 bg-white shadow sm:items-baseline w-auto">
      <div className="mb-2 sm:mb-0">
      <a className="text-xl no-underline text- text-teal-500 ml-2">Taller 4</a>
      </div>
      <div>
        <button onClick={() => navigate('/all-songs')} className="text-lg  text-grey-darkest hover:text-teal-500 m-1 p-2 ">All Songs</button>
        <button onClick={() => navigate('/all-playlists')} className="text-lg text-grey-darkest hover:text-teal-500 m-1 p-2">My Playlist</button>
        <button onClick={() => navigate('/create-playlist')} className="text-lg text-grey-darkest hover:text-teal-500 m-1 p-2">Create Playlist</button>
      </div>
    </nav>
  )
}

export default Navbar
