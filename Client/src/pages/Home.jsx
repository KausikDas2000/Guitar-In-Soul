import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

import { getAllSongs } from "../services/songService";
import Footer from "./Footer";

const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const data = await getAllSongs();

      console.log(data);

      setSongs(data.arrangements);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      
    </>
  );
};

export default Home;