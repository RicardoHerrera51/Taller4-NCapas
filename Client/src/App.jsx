import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import AllSongs from "./pages/AllSongs/AllSongs"
import SongToPlaylist from "./pages/SongToPlaylist/SongToPlaylist"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/all-songs" element={<AllSongs />} />
      <Route path="/song/:code" element={<SongToPlaylist />} />
    </Routes>
  )
}

export default App
