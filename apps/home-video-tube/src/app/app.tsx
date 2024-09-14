import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Tape from "./pages/Tape";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  useQuery,
} from '@tanstack/react-query';

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
  const location = useLocation();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['all-tapes'],
    queryFn: async () => {
      const url = `${process.env["NX_METADATA_API_URL"]}api/v2/Tapes`;
      const response = await axios.get(url);
      return response.data;
    }
  });
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TAPE_LIST", payload: data });
    }
  }, [data, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      {isLoading && <div>opening up the tape drawer...</div>}
      {!isLoading &&
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/library" element={<Home />} />
          <Route path="/tape/:id" element={<Tape />} />
          <Route path="about" element={<About />} />
        </Routes>}
    </ThemeProvider>
  );
}

export default App;
