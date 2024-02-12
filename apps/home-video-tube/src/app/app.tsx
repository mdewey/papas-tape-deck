import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Video from "./pages/Video";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";


export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get(`${process.env["NX_METADATA_API_URL"]}api/v2/Movies`)
      .then(resp => {
        dispatch({ type: "SET_MOVIES", payload: resp.data });
      });

  }, [dispatch]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/library" element={<Home />} />
        <Route path="/movie/:id" element={<Video />} />
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
