import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist"
import MyPlaylists from "./pages/MyPlaylists/MyPlaylists"
import PlaylistDetails from "./pages/PlaylistDetails/PlaylistDetails"
import Profile from "./pages/Profile/Profile"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

function App() {

  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/" element={ <Dashboard /> } />
      <Route path="/create-pl" element={ <CreatePlaylist /> } />
      <Route path="/my-pl" element={ <MyPlaylists /> } />
      <Route path="/pl-details" element={ <PlaylistDetails /> } />
      <Route path="/profile" element={ <Profile /> } />
    </Routes>
  )
}

export default App
