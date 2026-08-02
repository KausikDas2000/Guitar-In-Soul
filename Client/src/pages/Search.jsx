import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchHero from "../components/search/SearchHero";
import SearchFilters from "../components/search/SearchFilters";
import SearchResults from "../components/search/SearchResults";

import { getAllSongs } from "../services/songService";

const Search = () => {

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    const data = await getAllSongs();

    setSongs(data.arrangements);
    setFilteredSongs(data.arrangements);
  };

  useEffect(() => {

    let result = songs;

    if (search) {
      result = result.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      result = result.filter(song => song.genre === genre);
    }

    if (difficulty) {
      result = result.filter(song => song.difficulty === difficulty);
    }

    setFilteredSongs(result);

  }, [search, genre, difficulty, songs]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100">

        <SearchHero />

        <SearchFilters
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />

        <SearchResults
          songs={filteredSongs}
        />

      </main>

    </>
  );
};

export default Search;