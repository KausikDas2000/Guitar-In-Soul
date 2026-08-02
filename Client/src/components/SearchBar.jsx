import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex items-center bg-white rounded-2xl shadow-lg p-2">
        <FaSearch className="ml-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search by title, artist or genre..."
          className="flex-1 p-4 outline-none"
        />

        <button className="bg-black text-white px-8 py-3 rounded-xl">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;