import { useState } from "react";
import FetchServices from "../../services/FetchServices";
import Navbar from "../../components/Navbar/Navbar";

const CreatePlaylist = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [registrationError, setRegistrationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const playlist = await FetchServices.createPlaylist(token, title, description);
      if (playlist) {
        // Registration successful, handle further actions (e.g., redirect to a new page)
        setRegistrationError("Playlist created");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      setRegistrationError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="absolute flex items-center justify-center h-full w-full bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
          <h2 className="text-3xl text-white font-extrabold text-center mb-6">Create Playlist</h2>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="text-white">Title</label>
              <input id="title" name="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter playlist title" />
            </div>
            <div>
              <label htmlFor="description" className="text-white">Description</label>
              <textarea id="description" name="description" rows="3" required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full py-2 px-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter playlist description"></textarea>
            </div>
            {registrationError && (
              <div className="text-red-500 text-sm mb-2 text-center">{registrationError}</div>
            )}
            <div className="flex justify-center">
              <button type="submit" className="w-[150px] my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg self-end">
                Create
              </button>
            </div>
          </form>
        </div>
      </div></>
  );
};

export default CreatePlaylist;