import Request from "../model/requestModel.js";

// Create Request
export const createRequest = async (req, res) => {
  try {
    const {
      title,
      artist,
      genre,
      difficulty,
      description,
      youtubeLink,
    } = req.body;

    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "Title and Artist are required",
      });
    }

    const request = await Request.create({
      title,
      artist,
      genre,
      difficulty,
      description,
      youtubeLink,
      requestedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Song request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Request
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "requestedBy",
      "name email"
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Vote Request
export const voteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const alreadyVoted = request.votes.includes(req.user._id);

    if (alreadyVoted) {
      request.votes.pull(req.user._id);
    } else {
      request.votes.push(req.user._id);
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: alreadyVoted
        ? "Vote removed"
        : "Vote added",
      votes: request.votes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Status (Admin)
export const updateRequestStatus = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = req.body.status;

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request status updated",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Request
export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};