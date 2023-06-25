import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import AllSongs from "./pages/AllSongs/AllSongs"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/all-songs" element={<AllSongs />} />
    </Routes>
  )
}

export default App
