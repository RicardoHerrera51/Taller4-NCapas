import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage or any other storage mechanism
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-2 px-2 bg-slate-500 shadow sm:items-baseline w-auto">
      <div className="mb-2 sm:mb-0">
      <a className="text-3xl no-underline text-white ml-2">Taller 4</a>
      </div>
      <div className='flex flex-row'>
        <button onClick={() => navigate('/all-songs')} className="text-lg  text-grey-darkest hover:text-teal-300 m-1 p-2 ">All Songs</button>
        <button onClick={() => navigate('/all-playlists')} className="text-lg text-grey-darkest hover:text-teal-300 m-1 p-2">My Playlists</button>
        <button onClick={() => navigate('/create-playlist')} className="text-lg text-grey-darkest hover:text-teal-300 m-1 p-2">Create Playlist</button>
        <button onClick={handleLogout}>
          <HiOutlineLogout size="40px" className="text-grey-darkest hover:text-teal-500 m-1 p-2" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
