const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  // date: {
  //     type: Date,
  //     required: true
  // },
  complaint: {
    type: String,
    required: true,
  },
  // reply: {
  //     type: String,
  //     required: true
  // },
  // status: {
  //     type: String,
  //     required: true
  // },
  userid: {
    type: String,
    required: true,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
