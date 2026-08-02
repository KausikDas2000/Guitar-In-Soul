import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    let folder = "guitar-in-soul/others";
    let resource_type = "auto";
    if (file.fieldname === "profileImage") {
      folder = "guitar-in-soul/profile-images";
      resource_type = "image";
    }

    if (file.fieldname === "coverImage") {
      folder = "guitar-in-soul/covers";
      resource_type = "image";
    }

    if (file.fieldname === "notationPdf") {
      folder = "guitar-in-soul/pdfs";
      resource_type = "image";
    }

    if (file.fieldname === "audioFile") {
      folder = "guitar-in-soul/audio";
      resource_type = "video";
    }

    return {
      folder,
      resource_type,
      type: "upload",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});


const fileFilter = (req, file, cb) => {

  if (file.fieldname === "coverImage") {
    if (!file.mimetype.startsWith("image")) {
      return cb(new Error("Only image files are allowed"));
    }
  }


  if (file.fieldname === "notationPdf") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF allowed"));
    }
  }


  if (file.fieldname === "audioFile") {
    if (!file.mimetype.startsWith("audio")) {
      return cb(new Error("Only audio files allowed"));
    }
  }


  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});


export default upload;