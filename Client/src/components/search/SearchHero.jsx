import { FaSearch } from "react-icons/fa";

const SearchHero = () => {

  return (

    <section className="bg-gradient-to-r from-black via-gray-900 to-black py-20">

      <div className="max-w-6xl mx-auto text-center px-6">

        <FaSearch className="text-orange-500 text-6xl mx-auto mb-6"/>

        <h1 className="text-5xl font-black text-white">

          Search Arrangements

        </h1>

        <p className="text-gray-400 mt-4 text-lg">

          Find your favourite guitar arrangements instantly.

        </p>

      </div>

    </section>

  );

};

export default SearchHero;