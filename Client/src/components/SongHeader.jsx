import {
  FaHeart,
  FaEye,
  FaDownload,
  FaPlay,
  FaMusic,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  deleteSong,
  incrementDownload,
} from "../services/songService";


const SongHeader = ({
  song,
  liked,
  likeCount,
  handleLike,
  favorite,
  handleFavorite,
}) => {


  const [showPreview, setShowPreview] = useState(false);


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const navigate = useNavigate();



  if (!song) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }



  const handleDownload = async () => {

    try {

      await incrementDownload(song._id);


      const link = document.createElement("a");

      link.href =
        song.notationPdf.url.replace(
          "/upload/",
          "/upload/fl_attachment/"
        );


      link.target = "_blank";

      link.click();


    }
    catch (err) {

      console.log(err);

    }

  };




  const handleDelete = async () => {


    const confirmDelete =
      window.confirm(
        "Delete this arrangement?"
      );


    if (!confirmDelete)
      return;



    try {


      await deleteSong(song._id);


      alert(
        "Arrangement deleted"
      );


      navigate("/arrangements");


    }
    catch (err) {

      alert(
        err.response?.data?.message
      );

    }


  };



  return (

    <section
      className="
relative
overflow-hidden
rounded-[30px]
border
border-white/10
bg-gradient-to-br
from-[#0b1220]
via-[#101827]
to-black
text-white
shadow-[0_30px_90px_rgba(0,0,0,.55)]
"
    >


      {/* Background Glow */}

      <div
        className="
absolute
-top-32
-right-32
h-72
w-72
rounded-full
bg-orange-500/20
blur-[120px]
"
      />


      <div
        className="
absolute
bottom-0
left-0
h-72
w-72
rounded-full
bg-sky-500/10
blur-[120px]
"
      />



      <div
        className="
relative
grid
grid-cols-1
gap-10
p-5

sm:p-8

lg:grid-cols-[380px_1fr]
lg:gap-14
lg:p-10
"
      >



        {/* ================= COVER ================= */}


        <div
          className="
flex
justify-center
lg:justify-start
"
        >


          <div
            className="
relative
group
"
          >


            {/* Vinyl */}

            <div
              className="
hidden
sm:block

absolute
top-1/2
right-[-50px]

h-56
w-56

-translate-y-1/2

rounded-full

bg-gradient-to-br
from-zinc-800
to-black

border
border-zinc-600

opacity-40

shadow-2xl

transition-all
duration-700

group-hover:right-[-80px]
group-hover:rotate-[360deg]

"
            />


            {/* Vinyl Center */}

            <div
              className="
hidden
sm:block

absolute
top-1/2
right-[-50px]

h-12
w-12

-translate-y-1/2

rounded-full

bg-orange-500

border-4
border-black

z-10
"
            />



            {/* Cover Image */}

            <img

              src={
                song.coverImage?.url
              }

              alt={song.title}


              className="
relative
z-20

w-full max-w-[330px]

sm:w-[330px]

aspect-square

rounded-[32px]

object-cover

shadow-[0_25px_60px_rgba(0,0,0,.55)]

transition

duration-500

group-hover:scale-105

"
            />



            {/* Image Overlay */}

            <div
              className="
absolute
inset-0
z-30

rounded-[32px]

bg-gradient-to-t
from-black/60
via-transparent
to-transparent

"
            />



            {/* Play Button */}


            <button

              onClick={() => setShowPreview(true)}

              className="
absolute

left-1/2
top-1/2

z-40

flex

h-16
w-16

sm:h-20
sm:w-20

-translate-x-1/2
-translate-y-1/2


items-center
justify-center


rounded-full

bg-white/20

border
border-white/30

backdrop-blur-xl


text-xl
sm:text-3xl


opacity-0

scale-75


transition-all
duration-500


group-hover:opacity-100

group-hover:scale-100

"

            >


              <FaPlay className="ml-1" />


            </button>





            {/* Badge */}


            <div
              className="
absolute

bottom-4
left-4

z-40


flex

items-center

gap-2


rounded-full

bg-black/60

border
border-white/10


px-4
py-2


text-xs
sm:text-sm

font-semibold

"

            >

              <FaMusic
                className="text-orange-400"
              />


              Guitar In Soul


            </div>



          </div>


        </div>





        {/* ================= SONG INFO ================= */}



        <div
          className="
flex
flex-col
justify-center

min-w-0
"
        >



          <p
            className="
uppercase

tracking-[4px]

sm:tracking-[7px]

text-orange-400

font-bold

text-xs
sm:text-sm
"
          >

            Guitar Arrangement

          </p>



          <h1

            className="
mt-3

text-3xl

sm:text-5xl

lg:text-6xl


font-black

leading-tight

break-words

"

          >

            {song.title}


          </h1>




          {/* Artist */}


          <div
            className="
mt-6

flex

items-center

gap-3

"

          >


            <div
              className="
flex

h-12
w-12


items-center
justify-center


rounded-full


bg-orange-500/20


text-orange-400

"

            >

              <FaMusic />

            </div>



            <div>


              <p
                className="
text-xs

uppercase

tracking-widest

text-gray-400
"
              >

                Artist

              </p>


              <h3
                className="
text-xl

sm:text-2xl

font-bold

break-words
"
              >

                {song.artist}

              </h3>


            </div>


          </div>





          {/* Badges */}


          <div
            className="
mt-8

flex

flex-wrap

gap-3

"

          >


            <span
              className="
rounded-full

border

border-orange-500/30

bg-orange-500/10


px-4
py-2


text-sm

font-semibold

text-orange-300

"

            >

              🎸 {song.difficulty}

            </span>



            <span
              className="
rounded-full

border

border-sky-500/30

bg-sky-500/10


px-4
py-2


text-sm

font-semibold

text-sky-300

"

            >

              🎵 {song.genre}

            </span>


          </div>



          <div
            className="
my-8

h-px

bg-gradient-to-r

from-transparent

via-white/20

to-transparent

"
          />


          <div
            className="
my-8
h-px
bg-gradient-to-r
from-transparent
via-white/20
to-transparent
"
          />


          {/* ================= UPLOADER ================= */}


          <div
            className="
flex

flex-col

gap-5


sm:flex-row

sm:items-center

sm:justify-between

"

          >



            {/* User */}


            <div
              className="
flex

items-center

gap-4

min-w-0

"

            >


              <img

                src={
                  song?.uploader?.profileImage?.url ||

                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    song?.uploader?.name || "User"
                  )}&background=f97316&color=fff`
                }


                alt="Uploader"


                className="
h-14
w-14

sm:h-16
sm:w-16


rounded-full


border-2

border-orange-400


object-cover

shrink-0

"

              />



              <div className="min-w-0">


                <p
                  className="
text-sm

text-gray-400
"
                >

                  Uploaded by

                </p>



                <h3

                  className="
text-lg

sm:text-xl

font-bold

truncate

"

                >

                  {
                    song.uploader?.name || "Unknown"
                  }


                </h3>


              </div>


            </div>






            {/* Date */}


            <div

              className="
flex

items-center

gap-3


rounded-2xl


border

border-white/10


bg-white/5


px-5

py-4


w-fit

"

            >


              <FaCalendarAlt
                className="
text-orange-400
"
              />


              <span
                className="
text-sm

sm:text-base

text-gray-300

"

              >

                {
                  new Date(
                    song.createdAt
                  )
                    .toLocaleDateString()
                }


              </span>


            </div>



          </div>






          {/* ================= STATS ================= */}



          <div

            className="
mt-10


grid


grid-cols-1


sm:grid-cols-2


lg:grid-cols-3


gap-5

"

          >



            {/* LIKE */}


            <div

              onClick={handleLike}


              className="
group

cursor-pointer


rounded-3xl


border

border-white/10


bg-white/5


backdrop-blur-xl


p-5


sm:p-6


transition


hover:-translate-y-2


hover:border-red-400/40


hover:bg-red-500/10

"

            >


              <FaHeart

                className={`
text-2xl

sm:text-3xl


transition


${liked

                    ?

                    "text-red-500 scale-125"

                    :

                    "text-red-300"

                  }

`}

              />



              <h2

                className="
mt-4


text-2xl


sm:text-3xl


font-bold

"

              >

                {likeCount}

              </h2>


              <p
                className="
text-gray-400

mt-1

"

              >

                {
                  liked
                    ?
                    "Liked"
                    :
                    "Likes"
                }


              </p>


            </div>





            {/* VIEWS */}



            <div

              className="
rounded-3xl


border

border-white/10


bg-white/5


backdrop-blur-xl


p-5


sm:p-6


transition


hover:-translate-y-2


hover:border-sky-400/40


hover:bg-sky-500/10

"

            >


              <FaEye

                className="
text-2xl

sm:text-3xl

text-sky-400

"

              />



              <h2

                className="
mt-4

text-2xl

sm:text-3xl

font-bold

"

              >

                {song.views}

              </h2>



              <p
                className="
text-gray-400

mt-1

"

              >

                Views

              </p>


            </div>







            {/* DOWNLOAD */}



            <div

              className="
rounded-3xl


border

border-white/10


bg-white/5


backdrop-blur-xl


p-5


sm:p-6


transition


hover:-translate-y-2


hover:border-green-400/40


hover:bg-green-500/10

"

            >


              <FaDownload

                className="
text-2xl

sm:text-3xl

text-green-400

"

              />


              <h2

                className="
mt-4

text-2xl

sm:text-3xl

font-bold

"

              >

                {song.downloads}


              </h2>



              <p
                className="
text-gray-400

mt-1

"

              >

                Downloads

              </p>



            </div>



          </div>
          {/* ================= ACTION BAR ================= */}


          <div className="mt-10">


            <div
              className={`
grid

grid-cols-1

sm:grid-cols-2


gap-5


${(user?._id === song.uploader?._id ||
                  user?.role === "admin")

                  ?

                  "xl:grid-cols-4"

                  :

                  "xl:grid-cols-3"

                }

`}
            >



              {/* ================= PREVIEW ================= */}



              <button

                onClick={() => setShowPreview(true)}

                className="
group


flex

min-h-[80px]


items-center

justify-center


gap-3


rounded-2xl


px-5


py-4



bg-gradient-to-r

from-orange-500

to-orange-600



text-white


font-semibold


text-sm

sm:text-base


shadow-lg

shadow-orange-500/30



transition-all


hover:-translate-y-2


hover:shadow-orange-500/50


"

              >


                <FaPlay

                  className="
text-lg

transition-transform

group-hover:translate-x-1

"

                />



                <span
                  className="
text-center
"
                >

                  Preview Arrangement

                </span>


              </button>







              {/* ================= DOWNLOAD ================= */}



              <button


                onClick={handleDownload}


                className="
group


flex

min-h-[80px]


items-center

justify-center


gap-3


rounded-2xl


px-5


py-4



bg-zinc-800



border

border-zinc-700



text-white


font-semibold


text-sm

sm:text-base



transition-all



hover:-translate-y-2


hover:border-orange-500


hover:bg-zinc-700


"

              >



                <FaDownload

                  className="
text-lg

transition-transform

group-hover:-translate-y-1

"

                />



                <span
                  className="text-center"
                >

                  Download PDF

                </span>



              </button>








              {/* ================= DELETE ================= */}



              {

                (user?._id === song.uploader?._id ||
                  user?.role === "admin")

                &&


                (

                  <button


                    onClick={handleDelete}


                    className="
group


flex

min-h-[80px]


items-center

justify-center


gap-3


rounded-2xl


px-5


py-4



bg-red-500/10



border

border-red-500/30



text-red-300


font-semibold


text-sm

sm:text-base



transition-all



hover:-translate-y-2


hover:bg-red-500


hover:text-white



"

                  >


                    <FaTrash

                      className="
text-lg

transition-transform

group-hover:rotate-12

"

                    />



                    <span
                      className="text-center"
                    >

                      Delete Arrangement

                    </span>


                  </button>

                )

              }





              {/* ================= SAVE ================= */}



              <button


                onClick={handleFavorite}


                className={`
group


flex

min-h-[80px]


items-center

justify-center


gap-3


rounded-2xl


px-5


py-4


font-semibold


text-sm

sm:text-base



transition-all



hover:-translate-y-2



${favorite

                    ?


                    "bg-orange-500 text-white shadow-lg shadow-orange-500/30"


                    :


                    "bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700"

                  }


`}


              >


                <FaHeart

                  className={`

text-lg


transition-transform


group-hover:scale-125



${favorite

                      ?

                      "text-white"

                      :

                      "text-orange-400"

                    }

`}

                />



                <span>

                  {
                    favorite
                      ?
                      "Saved"
                      :
                      "Save"
                  }

                </span>



              </button>



            </div>


          </div>
          {/* ================= PDF PREVIEW ================= */}


          {
            showPreview && (

              <div
                className="
fixed
inset-0

z-50

flex

items-center

justify-center


bg-black/80

backdrop-blur-sm


p-4

"
              >


                <div
                  className="
relative

h-[90vh]

w-full


max-w-6xl


overflow-hidden


rounded-3xl


bg-white


shadow-2xl

"
                >


                  <button


                    onClick={() => setShowPreview(false)}


                    className="
absolute

right-4

top-4


z-20


rounded-full


bg-red-500


px-4

py-2


font-bold


text-white


hover:bg-red-600

"

                  >

                    ✕

                  </button>



                  <iframe

                    src={song.notationPdf?.url}

                    title="PDF Preview"


                    className="
h-full

w-full

"

                  />



                </div>



              </div>

            )

          }





          {/* ================= CREATOR CARD ================= */}



          <div

            className="
mt-12


rounded-[32px]


border

border-white/10


bg-white/5


backdrop-blur-2xl



p-5


sm:p-8


"

          >



            <p

              className="
mb-6


text-xs


sm:text-sm


font-bold


uppercase


tracking-[4px]


text-orange-400

"

            >

              Arrangement Creator

            </p>





            <div

              className="
flex


flex-col


gap-8



xl:flex-row


xl:items-center


xl:justify-between

"

            >



              {/* PROFILE */}



              <div

                className="
flex


items-center


gap-4


min-w-0

"

              >



                <img


                  src={

                    song?.uploader?.profileImage?.url

                    ||

                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      song?.uploader?.name || "User"
                    )}&background=f97316&color=fff`

                  }



                  alt="Creator"


                  className="
h-20

w-20


sm:h-24

sm:w-24



rounded-full


border-4


border-orange-500


object-cover


shrink-0

"

                />




                <div className="min-w-0">


                  <div

                    className="
flex


flex-wrap


items-center


gap-2

"

                  >



                    <h2

                      className="
text-xl

sm:text-2xl


lg:text-3xl


font-bold


truncate

"

                    >

                      {
                        song.uploader?.name || "Unknown"
                      }

                    </h2>




                    <span

                      className="
rounded-full


bg-sky-500/20


px-3


py-1


text-xs


font-bold


text-sky-300

"

                    >

                      VERIFIED

                    </span>



                  </div>




                  <p

                    className="
mt-2


text-sm


text-gray-400

"

                  >

                    Passionate Guitar Arrangement Creator

                  </p>



                </div>



              </div>







              {/* INFO BOXES */}



              <div

                className="
grid


grid-cols-1


sm:grid-cols-2


gap-4


"

              >



                <div

                  className="
rounded-2xl


bg-black/30


px-6


py-4


text-center

"

                >


                  <p className="text-sm text-gray-400">

                    Uploaded

                  </p>



                  <h3

                    className="
mt-2


font-bold

"

                  >

                    {
                      new Date(
                        song.createdAt
                      )
                        .toLocaleDateString()
                    }

                  </h3>


                </div>





                <div

                  className="
rounded-2xl


bg-black/30


px-6


py-4


text-center

"

                >


                  <p className="text-sm text-gray-400">

                    Genre

                  </p>



                  <h3

                    className="
mt-2


font-bold

"

                  >

                    {song.genre}

                  </h3>



                </div>



              </div>





            </div>



          </div>







          {/* ================= DESCRIPTION ================= */}



          <div

            className="
mt-12


overflow-hidden


rounded-[32px]


border


border-white/10



bg-white/5


backdrop-blur-2xl

"

          >



            {/* HEADER */}



            <div

              className="
flex


items-center


gap-4


border-b


border-white/10


p-5


sm:p-8

"

            >



              <div

                className="
flex


h-14

w-14


sm:h-16

sm:w-16



items-center


justify-center



rounded-2xl


bg-gradient-to-br


from-orange-500


to-orange-600



text-2xl


shadow-xl


shadow-orange-500/30

"

              >

                📖

              </div>





              <div>


                <p

                  className="
text-xs


uppercase


tracking-[4px]


text-gray-400

"

                >

                  Description

                </p>



                <h2

                  className="
text-xl


sm:text-3xl


font-bold

"

                >

                  About this Arrangement

                </h2>


              </div>



            </div>






            {/* BODY */}



            <div

              className="
p-5


sm:p-8

"

            >



              <p

                className="
whitespace-pre-line


text-base


sm:text-lg


leading-8


sm:leading-10


text-gray-300

"

              >

                {

                  song.description ||

                  "No description has been added for this arrangement yet."

                }


              </p>


            </div>


          </div>

        </div>
      </div>





    </section>

  );

};
export default SongHeader;