import { useEffect, useState } from "react";
import SongCard from "../SongCard";
import { getAllSongs } from "../../services/songService";

const MyUploads = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUploads();
  }, []);

  const loadUploads = async () => {
    try {
      const data = await getAllSongs();

      

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setSongs([]);
        return;
      }

      const uploads = data.arrangements.filter(
        (song) => song.uploader?._id === user._id
      );

      console.log("User ID:", user._id);

data.arrangements.forEach((song) => {
  console.log("Uploader:", song.uploader);
});
      

      setSongs(uploads);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8">
          🎸 My Uploads
        </h2>

        <div className="text-center py-20 text-gray-500">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          🎸 My Uploads
        </h2>

        <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
          {songs.length} Songs
        </span>

      </div>

      {songs.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

          <h3 className="text-2xl font-bold mb-3">
            No Uploads Yet
          </h3>

          <p className="text-gray-500">
            Start sharing your guitar arrangements with the community.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {songs.map((song) => (
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

export default MyUploads;