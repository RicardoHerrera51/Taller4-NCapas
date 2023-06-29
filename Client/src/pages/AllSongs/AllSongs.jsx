import { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AllSongs = () => {
    const [songs, setSongs] = useState([]);
    const [token, setToken] = useState("");
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                setToken(token);
                obtainSongs(token, searchKeyword, page, pageSize);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchData();
    }, [page, pageSize]);

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0); // Reset the page to 0 when performing a new search
        obtainSongs(token, searchKeyword, 0, pageSize); // Pass page as 0
    };

    const obtainSongs = (token, keyword, page, size) => {
        const queryParam = keyword ? `?title=${encodeURIComponent(keyword)}` : "";
        const queryParams = `page=${page}&size=${size}`;
        const fetchUrl = `${queryParam ? `${queryParam}&` : "?"}${queryParams}`;
        console.log("fetchUrl:", fetchUrl);

        FetchServices.getAllSongs(token, fetchUrl)
            .then((response) => {
                const songsData = response.content || [];
                const totalElements = response.totalElements || 0;
                const totalPages = response.totalPages || 0;

                console.log("Songs:", songsData);

                setSongs(songsData);
                setTotalElements(totalElements);
                setTotalPages(totalPages);
            })
            .catch((error) => {
                console.log("Error obtaining songs:", error);
                setSongs([]);
                setTotalElements(0);
                setTotalPages(0);
            });

    };

    return (
        <>
            <div className="absolute bg-gray-800 h-full w-full overflow-y-auto">
                <Navbar />
                <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg my-6" onSubmit={handleSearchSubmit}>
                    <h2 className="text-3xl dark:text-white font-bold text-center">
                        Search Songs
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

                {/* Render the song list */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl dark:text-white font-bold text-center pt-12 pb-4">All songs</h1>
                    {songs !== null && songs.map((song) => (
                        <Link key={song.code} to={`/song/${song.code}`}>
                            <div className="flex flex-row gap-12 justify-center max-w-[400px] w-full mx-auto bg-gray-900 py-2 px-8 rounded-lg my-4">
                                <h2 className="flex-1 dark:text-white font-bold py-2">
                                    Title: {song.title}
                                </h2>
                                <p className="flex text-gray-400 py-2 items-center">
                                    Duration: {song.duration}
                                </p>
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

export default AllSongs;