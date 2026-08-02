import User from "../model/user.js";
import Arrangement from "../model/Arrangement.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalArrangements = await Arrangement.countDocuments();

    const arrangements = await Arrangement.find();

    const totalLikes = arrangements.reduce(
      (sum, song) => sum + (song.likes?.length || 0),
      0
    );

    const totalViews = arrangements.reduce(
      (sum, song) => sum + (song.views || 0),
      0
    );

    const totalDownloads = arrangements.reduce(
      (sum, song) => sum + (song.downloads || 0),
      0
    );

    const totalFavorites = (
      await User.find()
    ).reduce(
      (sum, user) => sum + (user.favorites?.length || 0),
      0
    );

    const mostLiked = await Arrangement.findOne()
      .sort({ likes: -1 });

    const mostViewed = await Arrangement.findOne()
      .sort({ views: -1 });

    const mostDownloaded = await Arrangement.findOne()
      .sort({ downloads: -1 });

    res.json({
      success: true,
      totalUsers,
      totalArrangements,
      totalLikes,
      totalViews,
      totalDownloads,
      totalFavorites,
      mostLiked,
      mostViewed,
      mostDownloaded,
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
};




export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};





export const getAllArrangements = async (req, res) => {
  try {
    const arrangements = await Arrangement.find()
      .populate("uploader", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      arrangements,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteArrangement = async (req, res) => {
  try {

    const arrangement = await Arrangement.findById(req.params.id);

    if (!arrangement) {
      return res.status(404).json({
        success: false,
        message: "Arrangement not found",
      });
    }

    await arrangement.deleteOne();

    res.json({
      success: true,
      message: "Arrangement deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting admins
    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      success: true,
      message: "Role updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


