import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useRef,useEffect, useState } from "react";




const ProfileBanner = () => {


  const [loading, setLoading] = useState(false);





  const fileInputRef = useRef(null);
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://guitar-in-soul.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.user?.profileImage?.url) {
        setPreview(data.user.profileImage.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);
  const [preview, setPreview] = useState("https://ui-avatars.com/api/?name=Kausik+Das&background=111827&color=fff&size=256");

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setLoading(true);

      await axios.put(
        "http://guitar-in-soul.onrender.com/api/users/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile image updated!");
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };






  return (
    <section className="relative h-[320px] bg-gradient-to-r from-black via-gray-900 to-orange-900">

      {/* Cover Image */}
      <img
        src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
        alt="Cover"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* Avatar */}
      <div className="absolute left-1/2 -bottom-20 -translate-x-1/2">

        <div className="relative">

          <img
            src={preview}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          {loading && (
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <button
            onClick={handleCameraClick}
            className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 transition p-3 rounded-full text-white shadow-lg"
          >
            <FaCamera />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

        </div>

      </div>

    </section>
  );
};

export default ProfileBanner;