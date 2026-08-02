import {
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaEdit,
  FaGuitar,
} from "react-icons/fa";



const ProfileInfo = ({ profile, setShowEditModal }) => {
  return (
    <section className="mt-28">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        {/* Name */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900">
            {profile?.name || "Unknown User"}
          </h1>

          <div className="flex justify-center items-center gap-2 mt-3 text-orange-500 font-semibold text-lg">
            <FaGuitar />
            Guitar Enthusiast
          </div>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-8">
            {profile?.bio || "No bio added yet."}
          </p>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-orange-500" />
            {profile?.location || "No location"}
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaGlobe className="text-orange-500" />
            {profile?.website || "No website"}
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaCalendarAlt className="text-orange-500" />
            Joined{" "}
            {profile?.createdAt
              ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              : "Unknown"}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:scale-105"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;