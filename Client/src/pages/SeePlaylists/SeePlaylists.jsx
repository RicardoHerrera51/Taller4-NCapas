import { useEffect, useState } from "react";
import FetchServices from "../../services/FetchServices";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const SeePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPlaylists();
  }, [page, pageSize]);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      obtainPlaylist(token, searchKeyword, page, pageSize);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0); // Reset the page to 0 when performing a new search
    obtainPlaylist(token, searchKeyword, 0, pageSize); // Pass page as 0
  };

  const obtainPlaylist = (token, keyword, page, size) => {
    const queryParam = keyword ? `?keyword=${encodeURIComponent(keyword)}` : "";
    const queryParams = `page=${page}&size=${size}`;
    const fetchUrl = `${queryParam ? `${queryParam}&` : "?"}${queryParams}`;
    console.log("fetchUrl:", fetchUrl);

    FetchServices.getAllPlaylists(token, fetchUrl)
      .then((response) => {
        const playlistData = response.content || [];
        const totalElements = response.totalElements || 0;
        const totalPages = response.totalPages || 0;

        console.log("Playlist:", playlistData);

        setPlaylists(playlistData);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
        console.log("Fetched playlists:", playlistData);
      })
      .catch((error) => {
        console.log("Error obtaining playlist:", error);
        setPlaylists([]);
        setTotalElements(0);
        setTotalPages(0);
      });

  };

  return (
    <>
    <div className="absolute bg-gray-800 h-full w-full p-2 overflow-y-auto">
    <Navbar />
      <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg my-4"  onSubmit={handleSearchSubmit}>
        <h2 className="text-3xl dark:text-white font-bold text-center">
          Search Playlist
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text" placeholder="Enter keyword" value={searchKeyword} onChange={handleSearchChange}
          />
        </div>
        <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">
          Search
        </button>
      </form>

      {/* Render playlists */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl dark:text-white font-bold text-center pt-12 pb-4">My playlists</h1>
        {playlists !== null && playlists.map((playlist) => (
          <Link key={playlist.code} to={`/playlist-details/${playlist.code}`}>
            <div key={playlist.code} className="flex flex-col items-center gap-2 max-w-[400px] w-full mx-auto bg-gray-900 py-2 px-8 rounded-lg my-4">
              <h2 className="flex-1 dark:text-white font-bold py-2">{playlist.title}</h2>
              <p className="flex text-gray-400 py-2">{playlist.description}</p>
            </div>
          </Link>
        ))}
      </div>


      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button disabled={page === 0} onClick={() => setPage(page - 1)} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-l">
          Prev
        </button>
        <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default SeePlaylists;
