const PlaylistDetails = () => {
    return (
        <body className="absolute bg-gray-800 text-white w-screen h-full p-6 overflow-y-auto">
            <div className="max-w-[400px] w-full mx-auto bg-gray-900 pt-8 pb-4 px-8 rounded-lg">
                <h2 className="text-3xl text-white font-bold text-center">Playlist Details</h2>
                <div className="p-6">
                    <h3 className="text-white font-bold">Playlist Title</h3>
                    <p className="text-gray-400">Total Duration: 30:15</p>
                </div>
                <div className="p-6">
                    <h3 className="text-white font-bold text-center">Songs in Playlist</h3>
                    <div className="divide-y divide-gray-700">
                        <div className="py-4">
                            <p className="text-white font-bold">Song 1 Title</p>
                            <p className="text-gray-400">Duration: 4:25</p>
                        </div>
                        <div className="py-4">
                            <p className="text-white font-bold">Song 2 Title</p>
                            <p className="text-gray-400">Duration: 3:50</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default PlaylistDetails;