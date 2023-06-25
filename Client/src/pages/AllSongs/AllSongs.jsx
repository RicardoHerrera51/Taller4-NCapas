import { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";

const AllSongs = () => {
    const [songs, setSongs] = useState([]);
    const [token, setToken] = useState("");
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        obtainSongs(token, searchKeyword);
    });


    const obtainSongs = (token, keyword) => {
        const queryParam = keyword ? `?title=${keyword}` : ''; // Include the keyword as a query parameter if provided

        FetchServices.login("douglas@gmail.com", "12345678Aa!")
            .then((token) => {
                FetchServices.getAllSongs(token, queryParam)
                    .then((response) => {
                        console.log("All songs:", response.data);
                        setSongs(response.data);
                    })
                    .catch(() => {
                        console.log("Error obtaining songs");
                    })
                    .finally(() => {
                        console.log("Finished obtaining songs:");
                        console.table(songs);
                    })
            })
    }

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Perform the search logic here using the searchKeyword value
        // You can filter the songs array based on the search keyword
        const filteredSongs = songs.filter((song) =>
            song.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSongs(filteredSongs);
    };

    return (
        <div className="absolute bg-gray-800 h-full w-full p-2 overflow-y-auto">
            <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg my-4" onSubmit={handleSearchSubmit}>
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
                {/*{songs.map((song) => (*/}
                <div className="flex flex-row gap-12 justify-center max-w-[400px] w-full mx-auto bg-gray-900 py-2 px-8 rounded-lg my-4">
                    <h2 className="dark:text-white font-bold py-2">
                        Title
                        {/*song.title*/}
                    </h2>
                    <p className="text-gray-400 py-2">
                        Duration
                        {/*song.duration*/}
                    </p>
                </div>
                {/*}))*/}
            </div>
        </div>

    );
}

export default AllSongs;