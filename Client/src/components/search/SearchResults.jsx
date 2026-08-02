import SongCard from "../SongCard";

const SearchResults = ({ songs }) => {

  return (

    <section className="max-w-7xl mx-auto px-6 pb-20">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">

          {songs.length} Results Found

        </h2>

      </div>

      {songs.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-4xl font-bold mb-4">

            No Arrangements Found

          </h2>

          <p className="text-gray-500">

            Try another search.

          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {songs.map(song=>(
            <SongCard
              key={song._id}
              song={song}
            />
          ))}

        </div>

      )}

    </section>

  );

};

export default SearchResults;