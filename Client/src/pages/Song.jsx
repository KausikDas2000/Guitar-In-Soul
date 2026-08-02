import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSong } from "../services/songService";

import Navbar from "../components/Navbar";
import SongHeader from "../components/SongHeader";
import MusicPlayer from "../components/MusicPlayer";
import { FaHeart } from "react-icons/fa";
import { toggleLike } from "../services/songService";
import { Helmet } from "react-helmet-async";

const Song = () => {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetchSong();
  }, [id]);

  const fetchSong = async () => {
    try {
      const data = await getSong(id);

      setSong(data.arrangement);

      console.log(data.arrangement);
      console.log(data.arrangement?.notationPdf?.url);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (song) {
      setLikeCount(song.likes?.length || 0);

      const tokenUser = JSON.parse(localStorage.getItem("user"));

      if (tokenUser) {
        setLiked(song.likes?.includes(tokenUser._id));
      }
    }
  }, [song]);

  const handleLike = async () => {
    try {
      const data = await toggleLike(id);

      setLiked(data.liked);
      setLikeCount(data.likes.length);
    } catch (error) {
      console.error(error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Song not found
      </div>
    );
  }


  return (
    <>

      <Helmet>
        <title>{song.title} | Guitar In Soul</title>

        <meta
          name="description"
          content={`${song.title} guitar arrangement by ${song.artist}. Preview and download the PDF on Guitar In Soul.`}
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href={`https://guitar-in-soul.vercel.app/arrangements/${song._id}`}
        />

        <meta property="og:title" content={`${song.title} | Guitar In Soul`} />

        <meta
          property="og:description"
          content={`${song.title} guitar arrangement by ${song.artist}.`}
        />

        <meta property="og:type" content="article" />

        {song.coverImage?.url && (
          <meta property="og:image" content={song.coverImage.url} />
        )}
      </Helmet>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">

          <SongHeader song={song} liked={liked}
            likeCount={likeCount}
            handleLike={handleLike} />


          <div className="mt-10">
            <MusicPlayer audioUrl={song.audioFile?.url} />
          </div>

        </div>
      </main>
    </>
  );
};

export default Song;