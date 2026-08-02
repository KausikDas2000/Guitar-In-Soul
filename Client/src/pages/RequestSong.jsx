import { useState,useEffect } from "react";
import {
  FiMusic,
  FiUser,
  FiTag,
  FiBarChart2,
  FiYoutube,
  FiFileText,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { createRequest } from "../services/requestService";
import { useNavigate } from "react-router-dom";

const RequestSong = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, []);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    difficulty: "Beginner",
    description: "",
    youtubeLink: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await createRequest(form);

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: data.message,
        confirmButtonColor: "#f97316",
      });

      setForm({
        title: "",
        artist: "",
        genre: "",
        difficulty: "Beginner",
        description: "",
        youtubeLink: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-orange-100 p-8">

        <div className="text-center mb-10">

          <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-5">
            <FiMusic size={38} />
          </div>

          <h1 className="text-4xl font-black text-gray-900">
            Request A Song
          </h1>

          <p className="text-gray-500 mt-3">
            Can't find your favorite arrangement?
            Send a request and our community may upload it.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}
          <div className="relative">

            <FiMusic className="absolute left-4 top-4 text-orange-500" />

            <input
              type="text"
              name="title"
              placeholder="Song Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

          {/* Artist */}
          <div className="relative">

            <FiUser className="absolute left-4 top-4 text-orange-500" />

            <input
              type="text"
              name="artist"
              placeholder="Artist"
              value={form.artist}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

          {/* Genre */}
          <div className="relative">

            <FiTag className="absolute left-4 top-4 text-orange-500" />

            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

          {/* Difficulty */}
          <div className="relative">

            <FiBarChart2 className="absolute left-4 top-4 text-orange-500" />

            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

          </div>

          {/* YouTube */}
          <div className="relative">

            <FiYoutube className="absolute left-4 top-4 text-orange-500" />

            <input
              type="url"
              name="youtubeLink"
              placeholder="YouTube Link (Optional)"
              value={form.youtubeLink}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

          {/* Description */}
          <div className="relative">

            <FiFileText className="absolute left-4 top-4 text-orange-500" />

            <textarea
              rows={5}
              name="description"
              placeholder="Describe your request..."
              value={form.description}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-orange-300"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold transition ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default RequestSong;