import { useEffect, useState } from "react";
import {
  FaUsers,
  FaMusic,
  FaHeart,
  FaDownload,
  FaEye,
  FaStar,
} from "react-icons/fa";

import StatCard from "../../components/admin/Card";
import FeatureCard from "../../components/admin/FutureCard";
import { getAnalytics } from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getAnalytics();
      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-xl sm:text-2xl font-semibold text-white animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">

        <StatCard
          icon={<FaUsers />}
          title="Users"
          value={stats.totalUsers}
        />

        <StatCard
          icon={<FaMusic />}
          title="Arrangements"
          value={stats.totalArrangements}
        />

        <StatCard
          icon={<FaHeart />}
          title="Likes"
          value={stats.totalLikes}
        />

        <StatCard
          icon={<FaStar />}
          title="Favorites"
          value={stats.totalFavorites}
        />

        <StatCard
          icon={<FaEye />}
          title="Views"
          value={stats.totalViews}
        />

        <StatCard
          icon={<FaDownload />}
          title="Downloads"
          value={stats.totalDownloads}
        />

      </div>

      {/* Featured Songs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 sm:mt-14">

        <FeatureCard
          title="🔥 Most Liked"
          song={stats.mostLiked}
        />

        <FeatureCard
          title="👁 Most Viewed"
          song={stats.mostViewed}
        />

        <FeatureCard
          title="⬇ Most Downloaded"
          song={stats.mostDownloaded}
        />

      </div>

      {/* Summary */}
      <div className="mt-10 sm:mt-14 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Platform Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="text-center md:text-left">

            <p className="text-zinc-400">
              Total Community
            </p>

            <h3 className="text-3xl sm:text-4xl font-black mt-2">
              {stats.totalUsers}
            </h3>

          </div>

          <div className="text-center md:text-left">

            <p className="text-zinc-400">
              Total Guitar Arrangements
            </p>

            <h3 className="text-3xl sm:text-4xl font-black mt-2">
              {stats.totalArrangements}
            </h3>

          </div>

          <div className="text-center md:text-left">

            <p className="text-zinc-400">
              Community Engagement
            </p>

            <h3 className="text-3xl sm:text-4xl font-black mt-2">
              {stats.totalLikes + stats.totalFavorites}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;