import SongCard from "./SongCard";
import { FaMusic } from "react-icons/fa";

const SongGrid = ({ songs = [] }) => {
  if (!songs.length) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg py-24 px-8 text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-orange-100 flex items-center justify-center">

          <FaMusic className="text-5xl text-orange-500" />

        </div>

        <h2 className="mt-8 text-3xl font-bold text-gray-900">
          No Arrangements Found
        </h2>

        <p className="mt-4 text-gray-500 max-w-lg mx-auto leading-8">
          We couldn't find any arrangements matching your search.
          Try changing your filters or upload a new arrangement.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
       grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8
      "
    >
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
        />
      ))}
    </div>
  );
};

export default SongGrid;