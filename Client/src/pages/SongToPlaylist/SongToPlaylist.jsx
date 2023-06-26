const SongToPlaylist = () => {

    return (
        <div className="absolute bg-gray-800 h-full w-full p-2 overflow-y-auto">
            <div className="max-w-[400px] w-full mx-auto bg-gray-900 pt-8 pb-4 px-8 rounded-lg my-4">
                <h2 className="text-3xl dark:text-white font-bold text-center">Song Details</h2>
                <div className="p-6">
                    <p className="dark:text-white font-bold text-center">Title: Hola</p>
                    <p className="text-gray-400 text-center">Duration: 2:34</p>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-3xl dark:text-white font-bold text-center pt-12 pb-4">Add to Playlist</h1>
                <div className="flex flex-row items-center gap-12 max-w-[400px] w-full mx-auto bg-gray-900 py-2 px-8 rounded-lg my-4">
                    <h2 className="flex-1 dark:text-white font-bold py-2">Playlist name</h2>
                    <button className="w-[100px] my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg self-end">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongToPlaylist;