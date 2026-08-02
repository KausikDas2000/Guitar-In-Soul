import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaStepBackward,
  FaStepForward,
  FaMusic,
} from "react-icons/fa";

const MusicPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    const loaded = () => setDuration(audio.duration);
    const update = () => setCurrent(audio.currentTime);

    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("timeupdate", update);

    audio.addEventListener("ended", () => {
      setPlaying(false);
      setCurrent(0);
    });

    return () => {
      audio.removeEventListener("loadedmetadata", loaded);
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  const togglePlay = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setPlaying(!playing);
  };

  const seek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrent(e.target.value);
  };

  const format = (time) => {
    if (!time) return "0:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      <audio ref={audioRef} src={audioUrl} />

      {/* Header */}
      <div className="p-8">

        {/* Album */}
        <div className="flex justify-center mb-8">
          <div
            className={`w-40 h-40 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-2xl border-4 border-white/10 ${
              playing ? "animate-spin" : ""
            }`}
            style={{
              animationDuration: "6s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: playing ? "running" : "paused",
            }}
          >
            <FaMusic size={60} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Arrangement Preview
          </h2>

          <p className="text-gray-400 mt-2">
            Listen before purchasing
          </p>
        </div>

        {/* Progress */}
        <div>

          <input
            type="range"
            min="0"
            max={duration}
            value={current}
            onChange={seek}
            className="w-full accent-green-500 cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{format(current)}</span>
            <span>{format(duration)}</span>
          </div>

        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-10">

          <button className="text-2xl hover:text-green-400 transition hover:scale-125">
            <FaStepBackward />
          </button>

          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,.5)] flex justify-center items-center text-3xl transition duration-300 hover:scale-110"
          >
            {playing ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>

          <button className="text-2xl hover:text-green-400 transition hover:scale-125">
            <FaStepForward />
          </button>

        </div>

        {/* Volume */}
        <div className="flex items-center gap-4 mt-10">

          <FaVolumeUp className="text-xl text-green-400" />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              audioRef.current.volume = e.target.value;
            }}
            className="flex-1 accent-green-500 cursor-pointer"
          />

          <span className="w-12 text-right text-sm text-gray-300">
            {Math.round(volume * 100)}%
          </span>

        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;