import { useState } from "react";
import {
  FaTimes,
  FaCamera,
  FaSave,
} from "react-icons/fa";
import axios from "axios";

const EditProfileModal = ({
  open,
  setOpen,
  profile,
  setProfile,
}) => {
  const [preview, setPreview] = useState(
    profile.profileImage?.url || profile.profileImage || ""
  );

  if (!open) return null;

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile({
      ...profile,
      avatar: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("bio", profile.bio);
    formData.append("location", profile.location);
    formData.append("website", profile.website);

    if (profile.avatar) {
      formData.append("profileImage", profile.avatar);
    }

    const { data } = await axios.put(
      "http://localhost:5000/api/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(data.message);

    setOpen(false);
  } catch (err) {
  console.error(err);
  console.log(err.response?.data);

  alert(err.response?.data?.message || "Update failed");
}
};

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white border-b">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Edit Profile
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Update your profile information
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-11 h-11 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-500 transition flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
        >
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative group">

              <img
                src={preview || "https://i.pravatar.cc/200"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-orange-500 shadow-xl"
              />

              <label className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full cursor-pointer shadow-lg transition group-hover:scale-110">

                <FaCamera />

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold mb-2">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block font-semibold mb-2">
              Website
            </label>

            <input
              type="text"
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t pt-5 pb-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditProfileModal;