import { createBrowserRouter,Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist"
import MyPlaylists from "./pages/MyPlaylists/MyPlaylists"
import PlaylistDetails from "./pages/PlaylistDetails/PlaylistDetails"
import Profile from "./pages/Profile/Profile"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute"

import { useEffect, useState } from "react";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };



  return (
    

    <Routes>
      <Route path="/login" element={ <Login onLogin={handleLogin} /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/" element={ 
        <ProtectedRoute isLogged={loggedIn}>
          <Dashboard /> 
         </ProtectedRoute>
       } />
      <Route path="/create-pl" element={
        <ProtectedRoute isLogged={loggedIn}>
         <CreatePlaylist />
         </ProtectedRoute>
          } />
      <Route path="/my-pl" element={ 
        <ProtectedRoute isLogged={loggedIn}>
        <MyPlaylists /> 
       </ProtectedRoute>
      } />
      <Route path="/my-pl/:id" element={ 
        <ProtectedRoute isLogged={loggedIn}>
        <PlaylistDetails /> 
       </ProtectedRoute>
      } />
      <Route path="/profile" element={ 
        <ProtectedRoute isLogged={loggedIn}>
        <Profile /> 
       </ProtectedRoute>
       } />
    </Routes>
  )
}

export default App
