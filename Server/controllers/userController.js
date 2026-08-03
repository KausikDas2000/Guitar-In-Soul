import User from "../model/user.js";
import Arrangement from "../model/Arrangement.js";



export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profileImage = {
      url: req.file.path,
      publicId: req.file.filename,
    };

    await user.save();

    const updatedUser = await User.findById(req.user._id);

    console.log(updatedUser.profileImage);

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user,
  });
};


export const updateProfile = async (req, res) => {

    console.log(req.body);
console.log(req.file);
console.log(req.user);
  try {
    const { name, bio, location, website } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update text fields
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.website = website || user.website;

    // Update profile image if uploaded
    if (req.file) {
      user.profileImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getProfileStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const uploads = await Arrangement.countDocuments({
      uploader: userId,
    });

    const user = await User.findById(userId);

    const arrangements = await Arrangement.find({
      uploader: userId,
    });

    let totalLikes = 0;
    let totalViews = 0;
    let totalDownloads = 0;

    arrangements.forEach((item) => {
      totalLikes += item.likes.length;
      totalViews += item.views || 0;
      totalDownloads += item.downloads || 0;
    });

    res.status(200).json({
      success: true,
      stats: {
        likes: totalLikes,
        uploads,
        views: totalViews,
        downloads: totalDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProfile = async (req,res)=>{
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    res.json({
      success:true,
      user
    });

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};