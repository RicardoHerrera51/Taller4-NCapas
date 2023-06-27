import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import AllSongs from "./pages/AllSongs/AllSongs"
import SongToPlaylist from "./pages/SongToPlaylist/SongToPlaylist"
import SeePlaylists from "./pages/SeePlaylists/SeePlaylists"
import PlaylistDetails from "./pages/PlaylistDetails/PlaylistDetails"
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/* http://localhost:8080/auth/login */}
      <Route path="/all-songs" element={<AllSongs />} /> {/* http://localhost:8080/song/ & http://localhost:8080/song/?title=keyword */}
      <Route path="/song/:code" element={<SongToPlaylist />} /> {/* http://localhost:8080/playlist/ & http://localhost:8080/playlist/?playlistCode=code */}
      <Route path="/all-playlists" element={<SeePlaylists />} /> {/* http://localhost:8080/user/playlist */}
      <Route path="/playlist-details/:code" element={<PlaylistDetails />} /> {/* http://localhost:8080/playlist/?playlistCode=code */}
      <Route path="/create-playlist" element={<CreatePlaylist />} /> {/* http://localhost:8080/playlist */}
    </Routes>
  )
}

export default App
