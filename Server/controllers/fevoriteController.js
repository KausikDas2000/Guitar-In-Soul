import User from "../model/user.js";
import Arrangement from "../model/Arrangement.js"

// Toggle Favourite
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { songId } = req.params;

    const user = await User.findById(userId);

    const exists = user.favorites.includes(songId);

    if (exists) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== songId
      );

      await user.save();

      return res.json({
        success: true,
        favorite: false,
        message: "Removed from favorites",
      });
    }

    user.favorites.push(songId);

    await user.save();

    res.json({
      success: true,
      favorite: true,
      message: "Added to favorites",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "favorites",
      populate: {
        path: "uploader",
        select: "name profileImage",
      },
    });

    res.json({
      success: true,
      favorites: user.favorites,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Remove Favourite
export const removeFavorite = async (req, res) => {
  try {
    const { songId } = req.params;

    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== songId
    );

    await user.save();

    res.json({
      success: true,
      message: "Favorite removed",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};