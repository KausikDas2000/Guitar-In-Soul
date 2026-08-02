import { FaSearch } from "react-icons/fa";

const SearchFilters = ({
  search,
  setSearch,
  genre,
  setGenre,
  difficulty,
  setDifficulty,
}) => {

  return (

    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="relative">

            <FaSearch className="absolute left-5 top-5 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search songs..."
              className="w-full border rounded-xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          <select
            value={genre}
            onChange={(e)=>setGenre(e.target.value)}
            className="border rounded-xl p-4"
          >
            <option value="">Genre</option>
            <option>Rock</option>
            <option>Pop</option>
            <option>Jazz</option>
            <option>Blues</option>
            <option>Classical</option>
          </select>

          <select
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}
            className="border rounded-xl p-4"
          >
            <option value="">Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button className="bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">

            Search

          </button>

        </div>

      </div>

    </section>

  );

};

export default SearchFilters;