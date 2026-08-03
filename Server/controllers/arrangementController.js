import Arrangement from "../model/Arrangement.js";
import cloudinary from "../config/cloudinary.js";

export const createArrangement = async (req, res) => {
  try {
    const {
      title,
      artist,
      genre,
      difficulty,
      description,
    } = req.body;

    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "Title and Artist are required",
      });
    }

    const cover = req.files.coverImage?.[0];
    const pdf = req.files.notationPdf?.[0];
    const audio = req.files.audioFile?.[0];

    const arrangement = await Arrangement.create({
      title,
      artist,
      genre,
      difficulty,
      description,

      coverImage: cover
        ? {
          url: cover.path,
          publicId: cover.filename,
        }
        : {},

      notationPdf: pdf
        ? {
          url: pdf.path,
          publicId: pdf.filename,
        }
        : {},

      audioFile: audio
        ? {
          url: audio.path,
          publicId: audio.filename,
        }
        : {},

      uploader: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Arrangement uploaded successfully",
      arrangement,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




export const getAllArrangements = async (req, res) => {
  try {
    const arrangements = await Arrangement.find()
      .populate("uploader", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: arrangements.length,
      arrangements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getArrangementById = async (req, res) => {
  try {

    const arrangement = await Arrangement.findById(req.params.id)
      .populate("uploader", "name email profileImage");


    if (!arrangement) {
      return res.status(404).json({
        success: false,
        message: "Arrangement not found"
      });
    }


    // Get viewer information
    const userId = req.user?._id?.toString() || null;

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;


    // Check if already viewed
    const alreadyViewed = arrangement.viewedBy.some(
      (view) =>
        (userId && view.user?.toString() === userId) ||
        view.ip === ip
    );


    // Increase only first time
    if (!alreadyViewed) {

      arrangement.views += 1;

      arrangement.viewedBy.push({
        user: userId,
        ip: ip
      });

      await arrangement.save();

    }


    res.json({
      success: true,
      arrangement
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



export const updateArrangement = async (req, res) => {
  const arrangement = await Arrangement.findById(req.params.id);

  arrangement.title = req.body.title;
  arrangement.artist = req.body.artist;
  arrangement.genre = req.body.genre;
  arrangement.difficulty = req.body.difficulty;
  arrangement.description = req.body.description;

  if (req.files.coverImage) {
    arrangement.coverImage = {
      url: req.files.coverImage[0].path,
      publicId: req.files.coverImage[0].filename,
    };
  }

  if (req.files.notationPdf) {
    arrangement.notationPdf = {
      url: req.files.notationPdf[0].path,
      publicId: req.files.notationPdf[0].filename,
    };
  }

  if (req.files.audioFile) {
    arrangement.audioFile = {
      url: req.files.audioFile[0].path,
      publicId: req.files.audioFile[0].filename,
    };
  }

  await arrangement.save();

  res.json({
    success: true,
    arrangement,
  });
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

    // Only uploader can delete
    if (arrangement.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Delete cover image
    if (arrangement.coverImage?.publicId) {
      await cloudinary.uploader.destroy(
        arrangement.coverImage.publicId
      );
    }

    // Delete PDF
    if (arrangement.notationPdf?.publicId) {
      await cloudinary.uploader.destroy(
        arrangement.notationPdf.publicId,
        {
          resource_type: "raw",
        }
      );
    }

    // Delete audio
    if (arrangement.audioFile?.publicId) {
      await cloudinary.uploader.destroy(
        arrangement.audioFile.publicId,
        {
          resource_type: "video",
        }
      );
    }

    await arrangement.deleteOne();

    res.json({
      success: true,
      message: "Arrangement deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// for Like
export const toggleLike = async (req, res) => {
  try {
    const arrangement = await Arrangement.findById(req.params.id);

    if (!arrangement) {
      return res.status(404).json({
        success: false,
        message: "Arrangement not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = arrangement.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      arrangement.likes = arrangement.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      arrangement.likes.push(userId);
    }

    await arrangement.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      totalLikes: arrangement.likes.length,
      likes: arrangement.likes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const incrementDownload = async (req, res) => {
  try {
    const song = await Arrangement.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { downloads: 1 },
      },
      { new: true }
    );

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Arrangement not found",
      });
    }

    res.json({
      success: true,
      downloads: song.downloads,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

