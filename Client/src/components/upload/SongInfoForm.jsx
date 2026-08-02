const SongInfoForm = ({ form, handleChange }) => {

  const genres = [
    "Rock",
    "Pop",
    "Metal",
    "Blues",
    "Jazz",
    "Country",
    "Classical",
    "Acoustic",
    "Fingerstyle",
    "Soundtrack"
  ];


  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">


      <h2 className="text-2xl font-bold mb-8 text-gray-900">
        🎵 Song Information
      </h2>


      <div className="space-y-6">


        {/* Title */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">
            Song Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Hotel California"
            className="
            w-full
            border
            border-gray-200
            bg-gray-50
            rounded-2xl
            p-4
            outline-none
            focus:bg-white
            focus:ring-4
            focus:ring-orange-100
            focus:border-orange-500
            transition
            "
          />

        </div>


        {/* Artist */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">
            Artist
          </label>

          <input
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
            placeholder="Eagles"
            className="
            w-full
            border
            border-gray-200
            bg-gray-50
            rounded-2xl
            p-4
            outline-none
            focus:bg-white
            focus:ring-4
            focus:ring-orange-100
            focus:border-orange-500
            transition
            "
          />

        </div>


        {/* Genre + Difficulty */}

        <div className="grid md:grid-cols-2 gap-6">


          {/* Genre */}

          <div>

            <label className="block mb-3 font-semibold text-gray-700">
              Genre
            </label>


            <select

              name="genre"

              value={form.genre}

              onChange={handleChange}

              className="
              w-full
              border
              border-gray-200
              bg-gray-50
              rounded-2xl
              p-4
              outline-none
              focus:bg-white
              focus:ring-4
              focus:ring-orange-100
              focus:border-orange-500
              transition
              "

            >

              <option value="">
                Select Genre
              </option>


              {genres.map((item)=>(

                <option key={item}>
                  {item}
                </option>

              ))}


            </select>


          </div>



          {/* Difficulty */}

          <div>

            <label className="block mb-3 font-semibold text-gray-700">
              Difficulty
            </label>


            <select

              name="difficulty"

              value={form.difficulty}

              onChange={handleChange}

              className="
              w-full
              border
              border-gray-200
              bg-gray-50
              rounded-2xl
              p-4
              outline-none
              focus:bg-white
              focus:ring-4
              focus:ring-orange-100
              focus:border-orange-500
              transition
              "

            >

              <option value="">
                Select Difficulty
              </option>

              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>


            </select>


          </div>


        </div>


        {/* Selected Genre Preview */}

        {form.genre && (

          <div className="mt-6 flex items-center gap-3">

            <span className="text-sm text-gray-500">
              Selected Genre:
            </span>


            <span
              className="
              px-4
              py-2
              rounded-full
              bg-orange-100
              text-orange-600
              font-semibold
              "
            >

              🎸 {form.genre}

            </span>


          </div>

        )}


      </div>


    </div>
  );
};


export default SongInfoForm;