// PlaylistDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchServices from "../../services/FetchServices";
import Navbar from "../../components/Navbar/Navbar";

const PlaylistDetails = () => {
  const { code } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPlaylistDetails();
  }, [page, pageSize]);

  const fetchPlaylistDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const queryParam = `?playlistCode=${code}`;
      const queryParams = `page=${page}&size=${pageSize}`;
      const fetchUrl = `${queryParam}&${queryParams}`;
      const playlistDetails = await FetchServices.getPlaylistDetails(token, fetchUrl);

      setPlaylist(playlistDetails);
      setTotalElements(playlistDetails?.page?.totalElements || 0);
      setTotalPages(playlistDetails?.page?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      setPlaylist(null);
      setTotalElements(0);
      setTotalPages(0);
    }
  };  

  const songs = playlist?.page?.content || [];

  return (
    <div className="absolute bg-gray-800 w-screen h-full overflow-y-auto">
      <Navbar />
      <div className="max-w-[400px] w-full mx-auto bg-gray-900 my-6 pb-4 px-8 rounded-lg">
        <h2 className="text-3xl text-white font-bold text-center p-6">Playlist Details</h2>
        {playlist !== null ? (
          <>
            <div className="p-6">
              <h3 className="text-white font-bold">{playlist.title}</h3>
              <p className="text-gray-400">Total Duration: {playlist.totalDuration}</p>
            </div>
            <div className="p-6">
              <h3 className="text-white font-bold text-center py-2">Songs in Playlist</h3>
              {songs.length > 0 ? (
                <>
                  <div className="divide-y divide-gray-700">
                    {songs.map((song, index) => (
                      <div className="py-4" key={index}>
                        <p className="text-white font-bold">{song.title}</p>
                        <p className="text-gray-400">Duration: {song.duration}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-4">
                    <button
                      disabled={page === 0}
                      onClick={() => setPage(page - 1)}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-l"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page === totalPages - 1}
                      onClick={() => setPage(page + 1)}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-r"
                    >
                      Next
                    </button>
                  </div>
                </>
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
