import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMusic,
  FaFilePdf,
  FaUserCircle,
  FaEye,
  FaCalendarAlt,
} from "react-icons/fa";

const SongCard = ({ song }) => {
  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-gray-100
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      {/* Cover */}

      <div className="relative overflow-hidden">

        <img
          src={
            song.coverImage?.url ||
            "https://placehold.co/600x400?text=No+Cover"
          }
          alt={song.title}
          className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

        {/* Genre */}

        <div className="absolute top-4 left-4">

          <span className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-4 py-1 rounded-full text-xs font-semibold">

            {song.genre || "Music"}

          </span>

        </div>

        {/* Difficulty */}

        <div className="absolute top-4 right-4">

          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">

            {song.difficulty}

          </span>

        </div>

        {/* Title */}

        <div className="absolute bottom-4 left-4 right-4">

          <h2 className="text-2xl font-bold text-white line-clamp-1">

            {song.title}

          </h2>

          <p className="text-gray-200 line-clamp-1">

            {song.artist}

          </p>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        {/* Stats */}

        <div className="grid grid-cols-3 gap-3 mb-6">

          <div className="bg-red-50 rounded-2xl p-3 text-center">

            <FaHeart className="mx-auto text-red-500 mb-2" />

            <p className="font-bold">
              {song.likes?.length || 0}
            </p>

            <span className="text-xs text-gray-500">
              Likes
            </span>

          </div>

          <div className="bg-blue-50 rounded-2xl p-3 text-center">

            <FaEye className="mx-auto text-blue-500 mb-2" />

            <p className="font-bold">
              {song.views || 0}
            </p>

            <span className="text-xs text-gray-500">
              Views
            </span>

          </div>

          <div className="bg-orange-50 rounded-2xl p-3 text-center">

            <FaFilePdf className="mx-auto text-orange-500 mb-2" />

            <p className="font-bold">

              PDF

            </p>

            <span className="text-xs text-gray-500">

              Included

            </span>

          </div>

        </div>

        {/* Uploader */}

        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

              <FaUserCircle className="text-orange-500 text-xl" />

            </div>

            <div>

              <p className="font-semibold">

                {song.uploader?.name || "Unknown"}

              </p>

              <p className="text-xs text-gray-500">

                Uploaded by

              </p>

            </div>

          </div>

          <div className="text-right">

            <FaCalendarAlt className="inline text-gray-400 mr-1" />

            <span className="text-xs text-gray-500">

              {new Date(song.createdAt).toLocaleDateString()}

            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3">

          <Link
            to={`/song/${song._id}`}
            className="
            flex
            justify-center
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            py-3
            font-semibold
            text-white
            hover:shadow-lg
            hover:scale-105
            transition-all
            "
          >
            <FaMusic />
            Listen
          </Link>

          <a
            href={song.notationPdf?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
            flex
            justify-center
            items-center
            gap-2
            rounded-xl
            bg-red-500
            py-3
            font-semibold
            text-white
            hover:bg-red-600
            transition
            "
          >
            <FaFilePdf />
            PDF
          </a>

        </div>

        <Link
          to={`/song/${song._id}`}
          className="
          mt-4
          block
          rounded-xl
          border-2
          border-orange-500
          py-3
          text-center
          font-semibold
          text-orange-500
          hover:bg-orange-500
          hover:text-white
          transition-all
          "
        >
          View Arrangement →
        </Link>

      </div>

    </div>
  );
};

export default SongCard;