import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchServices from "../../services/FetchServices";

const PlaylistDetails = () => {
    const { code } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const playlistDetails = await FetchServices.getPlaylistDetails(token, code);
                setPlaylist(playlistDetails);
            } catch (error) {
                console.error("Error fetching playlist details:", error);
                setPlaylist(null); // Set playlist to null on error
            }
        };


        fetchPlaylistDetails();
    }, [code]);

    const songs = playlist && playlist.songs ? playlist.songs : [];

    return (
        <div className="absolute flex items-center justify-center bg-gray-800 text-white w-screen h-full p-6 overflow-y-auto">
      <div className="max-w-[400px] w-full mx-auto bg-gray-900 pt-8 pb-4 px-8 rounded-lg">
        <h2 className="text-3xl text-white font-bold text-center">Playlist Details</h2>
        {playlist ? (
          <>
            <div className="p-6">
              <h3 className="text-white font-bold">{playlist.title}</h3>
              <p className="text-gray-400">Total Duration: {playlist.totalDuration}</p>
            </div>
            <div className="p-6">
              <h3 className="text-white font-bold text-center py-2">Songs in Playlist</h3>
              {songs.length > 0 ? (
                <div className="divide-y divide-gray-700">
                  {songs.map((song, index) => (
                    <div className="py-4" key={index}>
                      <p className="text-white font-bold">{song.title}</p>
                      <p className="text-gray-400">Duration: {song.duration}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No songs found in the playlist.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-white">Loading playlist details...</p>
        )}
      </div>
    </div>
    );
};

export default PlaylistDetails;