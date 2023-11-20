import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist"

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Dashboard /> } />
      <Route path="/create-pl" element={ <CreatePlaylist /> } />
    </Routes>
  )
}

export default App
