import { useEffect, useState } from "react";
import {
  FaHeart,
  FaMusic,
  FaEye,
  FaDownload,
} from "react-icons/fa";

import { getProfileStats } from "../../services/api";

const ProfileStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getProfileStats();

      setStats([
        {
          title: "Likes",
          value: data.stats.likes,
          icon: <FaHeart />,
          color: "text-red-500",
          bg: "bg-red-100",
        },
        {
          title: "Uploads",
          value: data.stats.uploads,
          icon: <FaMusic />,
          color: "text-orange-500",
          bg: "bg-orange-100",
        },
        {
          title: "Views",
          value: data.stats.views,
          icon: <FaEye />,
          color: "text-sky-500",
          bg: "bg-sky-100",
        },
        {
          title: "Downloads",
          value: data.stats.downloads,
          icon: <FaDownload />,
          color: "text-green-500",
          bg: "bg-green-100",
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading profile stats...
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>

            <h2 className="text-4xl font-black mt-5">
              {stat.value}
            </h2>

            <p className="text-gray-500 mt-2 font-medium">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileStats;