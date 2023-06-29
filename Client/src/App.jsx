import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import AllSongs from "./pages/AllSongs/AllSongs"
import SongToPlaylist from "./pages/SongToPlaylist/SongToPlaylist"
import SeePlaylists from "./pages/SeePlaylists/SeePlaylists"
import PlaylistDetails from "./pages/PlaylistDetails/PlaylistDetails"
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist"
import Register from "./pages/Register/Register"
import { useState } from "react"

const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Change 'token' to your specific token key

  // Return true if the user is authenticated (token is present), false otherwise
  return !!token;
};


function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  
  const handleLogin = () => {
    setLoggedIn(true);
  };
  
  return (
    <Routes>
      <Route path="/register" element={<Register />} /> {/* http://localhost:8080/auth/signup */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* http://localhost:8080/auth/login */}
      {loggedIn ? (
        <>
          <Route path="/all-songs" element={<AllSongs />} /> {/* http://localhost:8080/song/ & http://localhost:8080/song/?title=keyword */}
          <Route path="/song/:code" element={<SongToPlaylist />} /> {/* http://localhost:8080/playlist/ & http://localhost:8080/playlist/?playlistCode=code */}
          <Route path="/all-playlists" element={<SeePlaylists />} /> {/* http://localhost:8080/user/playlist */}
          <Route path="/playlist-details/:code" element={<PlaylistDetails />} /> {/* http://localhost:8080/playlist/?playlistCode=code */}
          <Route path="/create-playlist" element={<CreatePlaylist />} /> {/* http://localhost:8080/playlist */}
        </>
      ) : (
        <Route element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}

export default App
