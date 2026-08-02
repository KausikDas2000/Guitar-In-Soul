import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

import { getAllSongs } from "../services/songService";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

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

      <Helmet>
        <title>Guitar In Soul | Free Guitar Tabs & Arrangements</title>

        <meta
          name="description"
          content="Discover guitar tabs, upload your own arrangements, and become part of a growing community of passionate musicians."
        />

        <meta
          name="keywords"
          content="guitar tabs, guitar arrangements, guitar pdf, sheet music, guitar chords"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://guitar-in-soul.vercel.app/"
        />

        <meta property="og:title" content="Guitar In Soul" />
        <meta
          property="og:description"
          content="Discover and share guitar arrangements."
        />
        <meta
          property="og:url"
          content="https://guitar-in-soul.vercel.app/"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar />
      <Hero />
      <Footer />

    </>
  );
};

export default Home;