const Complaint = require("../models/complaint");

const complaintController = {
  // Create a new complaint
  create: async (req, res) => {
    console.log("called");
    try {
      const { complaint, userid } = req.body;
      const newComplaint = new Complaint({
        complaint,
        userid,
      });
      await newComplaint.save();
      res.status(201).json({ msg: "Complaint created", data: newComplaint });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msg: "Error creating complaint", error: error.message });
    }
  },

  // Get all complaints
  getAll: async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.json({ msg: "OK", data: complaints });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching complaints", error: error.message });
    }
  },

  // Get complaint by ID
  getById: async (req, res) => {
    try {
      const complaintId = req.params.id;
      const complaint = await Complaint.findById(complaintId);
      if (complaint) {
        res.json({ msg: "Complaint found", data: complaint });
      } else {
        res.status(404).json({ msg: "Complaint not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching complaint", error: error.message });
    }
  },

  // Update complaint by ID
  updateById: async (req, res) => {
    try {
      const { date, complaint, reply, status, user_id } = req.body;
      const updatedComplaint = await Complaint.findOneAndUpdate(
        { _id: req.params.id },
        { date, complaint, reply, status, user_id },
        { new: true }
      );
      if (updatedComplaint) {
        res.json({ msg: "Complaint updated", data: updatedComplaint });
      } else {
        res.status(404).json({ msg: "Complaint not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating complaint", error: error.message });
    }
  },

  // Delete complaint by ID
  deleteById: async (req, res) => {
    try {
      const deletedComplaint = await Complaint.findOneAndDelete({
        _id: req.params.id,
      });
      if (deletedComplaint) {
        res.json({ msg: "Complaint deleted", data: deletedComplaint });
      } else {
        res.status(404).json({ msg: "Complaint not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting complaint", error: error.message });
    }
  },
};

module.exports = complaintController;
