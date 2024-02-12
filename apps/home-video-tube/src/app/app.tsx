import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Video from "./pages/Video";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5D4037",
    },
    secondary: {
      main: "#FF9800",
    },
  },
});

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // axios.get(`${process.env["NX_METADATA_API_URL"]}api/v2/Tapes`)
    //   .then(resp => {
    //     dispatch({ type: "SET_TAPE_LIST", payload: resp.data });
    //   });

  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/library" element={<Home />} />
        <Route path="/tape/:id" element={<Video />} />
        <Route path="about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
