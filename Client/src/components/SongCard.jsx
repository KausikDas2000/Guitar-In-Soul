import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMusic,
  FaFilePdf,
  FaEye,
  FaCalendarAlt,
  FaPlay,
  FaCompactDisc,
  FaCheckCircle,
} from "react-icons/fa";

const SongCard = ({ song }) => {
  const difficultyColor = {
    Beginner: "bg-green-500/90",
    Intermediate: "bg-yellow-500/90",
    Advanced: "bg-red-500/90",
  };

  return (
    <div
      className="
     group
    relative
    w-full
    max-w-[460px]
    h-[680px]
      rounded-[28px]
      overflow-hidden
      cursor-pointer

      bg-zinc-900
      border border-white/10

      shadow-xl

      transition-all
      duration-700
      hover:-translate-y-3
      hover:shadow-orange-500/30
      hover:shadow-2xl
      "
    >

      {/* Cover Image */}
      <div className="relative h-full w-full overflow-hidden">

        {/* Cover */}
        <img
          src={
            song.coverImage?.url ||
            "https://placehold.co/600x800?text=No+Cover"
          }
          alt={song.title}
          className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
    "
        />

        {/* Dark Overlay */}
        <div
          className="
      absolute
      inset-0
      bg-gradient-to-t
      from-black
      via-black/30
      to-black/10
    "
        />

        {/* Orange Glow */}
        <div
          className="
      absolute
      inset-0
      opacity-0
      group-hover:opacity-100
      transition
      duration-700
      bg-gradient-to-br
      from-orange-500/20
      via-transparent
      to-transparent
    "
        />

        {/* Floating Like Button */}
        <button
          className="
      absolute
      top-5
      right-5

      h-11
      w-11

      rounded-full

      backdrop-blur-xl

      bg-white/10

      border

      border-white/20

      flex

      items-center

      justify-center

      text-white

      hover:bg-red-500

      transition-all
      duration-300
    "
        >
          <FaHeart />
        </button>

        {/* Genre */}
        <span
          className="
      absolute
      top-5
      left-5

      px-4
      py-1.5

      rounded-full

      text-xs

      font-semibold

      text-white

      backdrop-blur-xl

      bg-white/15

      border

      border-white/20
    "
        >
          🎸 {song.genre || "Music"}
        </span>

        {/* Difficulty */}
        <span
          className={`
      absolute
      top-20
      left-5

      px-4
      py-1.5

      rounded-full

      text-xs

      font-semibold

      text-white

      ${difficultyColor[song.difficulty] ||
            "bg-orange-500/90"
            }
    `}
        >
          {song.difficulty}
        </span>

        {/* Center Play Button */}
        <Link
          to={`/song/${song._id}`}
          className="
      absolute

      inset-0

      flex

      items-center

      justify-center
    "
        >
          <div
            className="
        h-20
        w-20

        rounded-full

        backdrop-blur-xl

        bg-white/20

        border

        border-white/30

        flex

        items-center

        justify-center

        text-white

        text-3xl

        scale-75

        opacity-0

        group-hover:opacity-100

        group-hover:scale-100

        transition-all

        duration-500
      "
          >
            <FaPlay className="ml-1" />
          </div>
        </Link>

      </div>
      {/* Bottom Glass Panel */}
      <div
        className="
    absolute
    bottom-0
    left-0
    right-0

    p-5

    backdrop-blur-2xl
    bg-black/45

    border-t
    border-white/10

    translate-y-8
    group-hover:translate-y-0

    transition-all
    duration-500
  "
      >

        {/* Song Title */}
        <div className="mb-1 flex items-center justify-between">

          <h2
            className="
        text-2xl
        font-bold
        text-white
        line-clamp-1
      "
          >
            {song.title}
          </h2>

          <FaCompactDisc
            className="
        text-orange-400
        text-xl

        group-hover:rotate-[360deg]

        transition-transform

        duration-1000
      "
          />

        </div>

        {/* Artist */}
        <p
          className="
      text-gray-300
      text-sm
      mb-4
      line-clamp-1
    "
        >
          {song.artist}
        </p>

        {/* Likes + Views */}
        <div className="flex items-center gap-5 mb-5">

          <div className="flex items-center gap-2 text-red-400">

            <FaHeart />

            <span className="text-sm font-medium">

              {song.likes?.length || 0}

            </span>

          </div>

          <div className="flex items-center gap-2 text-sky-400">

            <FaEye />

            <span className="text-sm font-medium">

              {song.views || 0}

            </span>

          </div>

          <div
            className="
        ml-auto

        px-3

        py-1

        rounded-full

        bg-orange-500/20

        border

        border-orange-500/40

        text-orange-300

        text-xs

        font-semibold
      "
          >
            PDF Included
          </div>

        </div>

        {/* Uploader */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <img
              src={
                song?.uploader?.profileImage?.url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  song?.uploader?.name || "User"
                )}&background=f97316&color=fff`
              }
              alt={song?.uploader?.name || "User"}
              className="
          w-12
          h-12
          rounded-full
          object-cover

          border-2

          border-orange-400
        "
            />

            <div>

              <div className="flex items-center gap-1">

                <p className="text-white font-semibold">

                  {song.uploader?.name || "Unknown"}

                </p>

                <FaCheckCircle
                  className="
              text-sky-400
              text-xs
            "
                />

              </div>

              <p className="text-xs text-gray-400">

                Uploaded by

              </p>

            </div>

          </div>

          <div className="text-right">

            <div className="flex items-center gap-1 text-gray-300">

              <FaCalendarAlt />

              <span className="text-xs">

                {new Date(song.createdAt).toLocaleDateString()}

              </span>

            </div>

          </div>

        </div>

      </div>
      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">

        {/* Listen */}
        <Link
          to={`/song/${song._id}`}
          className="
      group/listen
      flex
      items-center
      justify-center
      gap-2

      rounded-2xl

      py-3

      font-semibold

      text-white

      bg-gradient-to-r
      from-orange-500
      to-orange-600

      transition-all
      duration-300

      hover:scale-105
      hover:shadow-lg
      hover:shadow-orange-500/40
    "
        >
          <FaPlay
            className="
        transition-transform
        duration-300
        group-hover/listen:translate-x-1
      "
          />

          Listen
        </Link>

        {/* PDF */}
        <a
          href={song.notationPdf?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
      group/pdf

      flex
      items-center
      justify-center
      gap-2

      rounded-2xl

      py-3

      font-semibold

      text-white

      bg-white/10

      backdrop-blur-xl

      border
      border-white/20

      transition-all
      duration-300

      hover:bg-red-500
      hover:border-red-500
      hover:scale-105
    "
        >
          <FaFilePdf
            className="
        transition-transform
        duration-300
        group-hover/pdf:rotate-12
      "
          />

          PDF
        </a>

      </div>

      {/* View Arrangement */}
      <Link
        to={`/song/${song._id}`}
        className="
    mt-4

    flex

    items-center

    justify-center

    gap-2

    rounded-2xl

    py-3

    font-semibold

    text-orange-300

    border

    border-orange-500/40

    bg-orange-500/10

    transition-all
    duration-300

    hover:bg-orange-500
    hover:text-white
    hover:border-orange-500
    hover:shadow-lg
    hover:shadow-orange-500/30
  "
      >

        <FaMusic />

        View Arrangement →

      </Link>

    </div>
  );
};

export default SongCard;