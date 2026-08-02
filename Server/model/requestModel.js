import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    artist: {
      type: String,
      required: true,
    },

    genre: String,

    difficulty: {
      type: String,
      default: "Beginner",
    },

    description: String,

    youtubeLink: String,

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Fulfilled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);