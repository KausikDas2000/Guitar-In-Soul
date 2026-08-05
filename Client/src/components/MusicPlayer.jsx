import {
  useEffect,
  useRef,
  useState
} from "react";

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


    const loaded = () => {
      setDuration(audio.duration);
    };


    const update = () => {
      setCurrent(audio.currentTime);
    };


    const ended = () => {
      setPlaying(false);
      setCurrent(0);
    };



    audio.addEventListener(
      "loadedmetadata",
      loaded
    );


    audio.addEventListener(
      "timeupdate",
      update
    );


    audio.addEventListener(
      "ended",
      ended
    );



    return () => {

      audio.removeEventListener(
        "loadedmetadata",
        loaded
      );


      audio.removeEventListener(
        "timeupdate",
        update
      );


      audio.removeEventListener(
        "ended",
        ended
      );

    };


  }, []);




  const togglePlay = () => {


    if (!playing) {

      audioRef.current.play();

    }
    else {

      audioRef.current.pause();

    }


    setPlaying(!playing);

  };




  const seek = (e) => {


    audioRef.current.currentTime =
      e.target.value;


    setCurrent(e.target.value);


  };




  const format = (time) => {


    if (!time)
      return "0:00";


    const min =
      Math.floor(time / 60);


    const sec =
      Math.floor(time % 60);



    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

  };




  return (

    <div
      className="
w-full

rounded-[40px]

overflow-hidden

border
border-white/10

bg-gradient-to-br

from-[#111827]

via-black

to-[#1f2937]

text-white

shadow-[0_30px_90px_rgba(0,0,0,.6)]

"
    >


      <audio
        ref={audioRef}
        src={audioUrl}
      />



      <div
        className="
p-6

sm:p-10

lg:p-14

"
      >



        {/* Album */}

        <div
          className="
flex
justify-center

mb-10

"
        >


          <div

            className={`
w-44
h-44

sm:w-56
sm:h-56


rounded-full


bg-gradient-to-br

from-orange-500

via-orange-700

to-black


flex

items-center

justify-center


border-4

border-white/10


shadow-[0_0_80px_rgba(249,115,22,.5)]


${playing ? "animate-spin" : ""}

`}


            style={{

              animationDuration: "6s",

              animationTimingFunction: "linear",

              animationIterationCount: "infinite",

              animationPlayState:
                playing ? "running" : "paused"

            }}

          >


            <FaMusic
              size={70}
              className="
text-white
"
            />


          </div>


        </div>

        {/* Title */}

        <div
          className="
text-center

mb-10

"
        >

          <h2
            className="
text-3xl

sm:text-4xl

font-black

"
          >
            Arrangement Preview
          </h2>


          <p
            className="
text-gray-400

mt-3

text-lg

"
          >
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


            className="
w-full

accent-orange-500

cursor-pointer

h-2

"
          />



          <div

            className="
flex

justify-between

mt-3

text-sm

text-gray-400

"

          >

            <span>
              {format(current)}
            </span>


            <span>
              {format(duration)}
            </span>


          </div>



        </div>





        {/* Controls */}

        <div

          className="
flex

justify-center

items-center

gap-10

mt-12

"

        >



          {/* Previous */}

          <button

            className="
text-3xl

text-gray-300

hover:text-orange-400

transition-all

hover:scale-125

"

          >

            <FaStepBackward />

          </button>






          {/* Play */}

          <button

            onClick={togglePlay}

            className="

w-24

h-24


rounded-full


bg-orange-500


hover:bg-orange-400


shadow-[0_0_40px_rgba(249,115,22,.6)]


flex

items-center

justify-center


text-4xl


transition-all


duration-300


hover:scale-110


"

          >


            {
              playing

                ?

                <FaPause />

                :

                <FaPlay className="ml-2" />

            }


          </button>






          {/* Next */}

          <button

            className="
text-3xl

text-gray-300

hover:text-orange-400

transition-all

hover:scale-125

"

          >

            <FaStepForward />

          </button>



        </div>







        {/* Volume */}

        <div

          className="

flex

items-center

gap-5


mt-12

"

        >



          <FaVolumeUp

            className="
text-2xl

text-orange-400

"
          />





          <input

            type="range"

            min="0"

            max="1"

            step="0.01"


            value={volume}


            onChange={(e) => {


              setVolume(e.target.value);


              audioRef.current.volume =
                e.target.value;


            }}


            className="

flex-1

accent-orange-500

cursor-pointer

h-2

"

          />





          <span

            className="
w-14

text-right

text-gray-300

font-semibold

"

          >

            {
              Math.round(volume * 100)
            }%

          </span>



        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;