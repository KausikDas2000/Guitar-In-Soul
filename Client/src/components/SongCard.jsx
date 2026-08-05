import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMusic,
  FaFilePdf,
  FaEye,
  FaCalendarAlt,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";

const SongCard = ({ song }) => {
  const difficultyColor = {
    Beginner:
      "bg-green-500/90 border-green-300/30",
    Intermediate:
      "bg-yellow-500/90 border-yellow-300/30",
    Advanced:
      "bg-red-500/90 border-red-300/30",
  };

  return (
    <div
      className="
        group
        w-full
        max-w-[430px]
        overflow-hidden

        rounded-[30px]

        bg-[#171717]

        border
        border-zinc-700/50

        shadow-xl

        transition-all
        duration-500

        hover:-translate-y-3
        hover:shadow-2xl
        hover:shadow-orange-500/20
      "
    >

      {/* ================= IMAGE SECTION ================= */}

      <div className="relative h-[290px] overflow-hidden">

        {/* Cover Image */}
        <img
          src={
            song.coverImage?.url ||
            "https://placehold.co/600x400?text=No+Cover"
          }
          alt={song.title}
          className="
      w-full
      h-full
      object-cover

      transition-all
      duration-700

      group-hover:scale-110
    "
        />

        {/* Dark Gradient */}
        <div
          className="
      absolute
      inset-0

      bg-gradient-to-t
      from-black
      via-black/20
      to-transparent
    "
        />

        {/* Orange Glow */}
        <div
          className="
      absolute
      inset-0

      opacity-0
      group-hover:opacity-100

      transition-all
      duration-700

      bg-gradient-to-br
      from-orange-500/30
      via-transparent
      to-transparent
    "
        />

        {/* Genre Badge */}
        <div
          className="
      absolute
      top-5
      left-5

      px-4
      py-2

      rounded-full

      bg-white/15

      backdrop-blur-xl

      border
      border-white/20

      text-xs
      font-semibold
      text-white
    "
        >
          🎸 {song.genre || "Music"}
        </div>

        {/* Difficulty Badge */}
        <div
          className={`
      absolute
      top-16
      left-5

      px-4
      py-2

      rounded-full

      border

      text-xs
      font-semibold
      text-white

      ${difficultyColor[song.difficulty] ||
            "bg-orange-500 border-orange-300/30"
            }
    `}
        >
          {song.difficulty}
        </div>

        {/* Favorite Button */}
        <button
          className="
      absolute
      top-5
      right-5

      w-11
      h-11

      rounded-full

      flex
      items-center
      justify-center

      backdrop-blur-xl

      bg-white/10

      border
      border-white/20

      text-white

      transition-all
      duration-300

      hover:bg-red-500
      hover:scale-110
    "
        >
          <FaHeart />
        </button>

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
        w-20
        h-20

        rounded-full

        bg-white/20

        backdrop-blur-xl

        border
        border-white/30

        flex
        items-center
        justify-center

        text-white
        text-3xl

        opacity-0
        scale-75

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

      {/* ================= CONTENT ================= */}

      <div className="bg-[#171717] px-6 py-6">

        {/* Song Title */}
        <div className="flex items-start justify-between">

          <div>

            <h2
              className="
          text-2xl
          font-bold
          text-white
          leading-tight
          line-clamp-1
        "
            >
              {song.title}
            </h2>

            <p
              className="
          mt-1
          text-zinc-400
          text-base
          line-clamp-1
        "
            >
              {song.artist}
            </p>

          </div>

          {/* Music Icon */}
          <div
            className="
        flex
        items-center
        justify-center

        h-11
        w-11

        rounded-full

        bg-orange-500/15

        text-orange-400

        transition-all
        duration-500

        group-hover:rotate-180
      "
          >
            <FaMusic className="text-lg" />
          </div>

        </div>

        {/* Stats */}
        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-5">

            {/* Likes */}
            <div className="flex items-center gap-2">

              <FaHeart className="text-red-500" />

              <span className="text-white font-semibold">
                {song.likes?.length || 0}
              </span>

            </div>

            {/* Views */}
            <div className="flex items-center gap-2">

              <FaEye className="text-sky-400" />

              <span className="text-white font-semibold">
                {song.views || 0}
              </span>

            </div>

          </div>

          {/* PDF Badge */}
          <div
            className="
        rounded-full

        border
        border-orange-500/30

        bg-orange-500/10

        px-4
        py-2

        text-xs
        font-semibold

        text-orange-300
      "
          >
            PDF Included
          </div>

        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-zinc-700" />


        {/* ================= UPLOADER ================= */}

        <div className="flex items-center justify-between">

          {/* Left Side */}
          <div className="flex items-center gap-4">

            <img
              src={
                song?.uploader?.profileImage?.url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  song?.uploader?.name || "User"
                )}&background=f97316&color=fff`
              }
              alt={song?.uploader?.name || "User"}
              className="
        h-14
        w-14
        rounded-full
        object-cover

        border-2
        border-orange-500

        shadow-lg
        shadow-orange-500/20
      "
            />

            <div>

              <div className="flex items-center gap-2">

                <h3
                  className="
            text-white
            font-semibold
            text-base
          "
                >
                  {song.uploader?.name || "Unknown"}
                </h3>

                <FaCheckCircle
                  className="
            text-sky-400
            text-sm
          "
                />

              </div>

              <p
                className="
          text-zinc-500
          text-sm
          mt-1
        "
              >
                Uploaded by
              </p>

            </div>

          </div>

          {/* Right Side */}
          <div className="text-right">

            <div
              className="
        flex
        items-center
        gap-2

        text-zinc-400
        text-sm
      "
            >

              <FaCalendarAlt />

              <span>
                {new Date(song.createdAt).toLocaleDateString()}
              </span>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-zinc-700" />



        {/* ================= ACTION BUTTONS ================= */}

        <div className="space-y-4">

          {/* Listen + PDF */}
          <div className="grid grid-cols-2 gap-4">

            {/* Listen */}
            <Link
              to={`/song/${song._id}`}
              className="
        flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        py-4

        bg-gradient-to-r
        from-orange-500
        to-orange-600

        text-white
        font-semibold

        shadow-lg
        shadow-orange-500/20

        transition-all
        duration-300

        hover:scale-[1.03]
        hover:shadow-orange-500/40
      "
            >
              <FaPlay />
              Listen
            </Link>

            {/* PDF */}
            <a
              href={song.notationPdf?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
        flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        py-4

        border
        border-zinc-700

        bg-zinc-800

        text-white
        font-semibold

        transition-all
        duration-300

        hover:bg-red-500
        hover:border-red-500
      "
            >
              <FaFilePdf />
              PDF
            </a>

          </div>

          {/* View Arrangement */}

          <Link
            to={`/song/${song._id}`}
            className="
      flex
      items-center
      justify-center
      gap-2

      rounded-2xl

      py-4

      border
      border-orange-500/30

      bg-orange-500/10

      text-orange-300
      font-semibold

      transition-all
      duration-300

      hover:bg-orange-500
      hover:text-white
      hover:border-orange-500
    "
          >
            <FaMusic />

            View Arrangement →

          </Link>

        </div>

      </div>
      {/* End Content Section */}





    </div>
  );
};

export default SongCard;