import { useEffect, useState } from "react";
import FetchServices from "../../services/FetchServices";

const SeePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setToken(token);
        const playlistsData = await FetchServices.getAllPlaylists(token, null);
        console.log("Fetched playlists:", playlistsData);
        setPlaylists(playlistsData);
      } catch {
        console.error("Error fetching playlists");
      }
    };

    fetchData();
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute bg-gray-800 h-full w-full p-2 overflow-y-auto">
      <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg my-4">
        <h2 className="text-3xl dark:text-white font-bold text-center">
          Search Playlist
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text" placeholder="Enter keyword" 
          />
        </div>
        <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">
          Search
        </button>
      </form>

      {/* Render playlists */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl dark:text-white font-bold text-center pt-12 pb-4">My playlists</h1>
        {playlists.map((playlist) => (
          <div key={playlist.code} className="flex flex-col items-center gap-2 max-w-[400px] w-full mx-auto bg-gray-900 py-2 px-8 rounded-lg my-4">
            <h2 className="flex-1 dark:text-white font-bold py-2">{playlist.name}</h2>
            <p className="flex text-gray-400 py-2">{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeePlaylists;
