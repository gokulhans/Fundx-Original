const Feedback = require("../models/feedback");

const feedbackController = {
  // Create a new feedback
  create: async (req, res) => {
    try {
      const { feedback, rating, userid } = req.body;
      const newFeedback = new Feedback({ feedback, rating, userid });
      await newFeedback.save();
      res.status(201).json({ msg: "Feedback created", data: newFeedback });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating feedback", error: error.message });
    }
  },

  // Get all feedback
  getAll: async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.json({ msg: "OK", data: feedback });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching feedback", error: error.message });
    }
  },

  // Get feedback by ID
  getById: async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const feedback = await Feedback.findById(feedbackId);
      if (feedback) {
        res.json({ msg: "Feedback found", data: feedback });
      } else {
        res.status(404).json({ msg: "Feedback not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching feedback", error: error.message });
    }
  },

  // Update feedback by ID
  updateById: async (req, res) => {
    try {
      const { date, feedback, rating, user_id } = req.body;
      const updatedFeedback = await Feedback.findOneAndUpdate(
        { _id: req.params.id },
        { date, feedback, rating, user_id },
        { new: true }
      );
      if (updatedFeedback) {
        res.json({ msg: "Feedback updated", data: updatedFeedback });
      } else {
        res.status(404).json({ msg: "Feedback not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating feedback", error: error.message });
    }
  },

  // Delete feedback by ID
  deleteById: async (req, res) => {
    try {
      const deletedFeedback = await Feedback.findOneAndDelete({
        _id: req.params.id,
      });
      if (deletedFeedback) {
        res.json({ msg: "Feedback deleted", data: deletedFeedback });
      } else {
        res.status(404).json({ msg: "Feedback not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting feedback", error: error.message });
    }
  },
};

module.exports = feedbackController;
