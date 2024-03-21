const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  linkedInUrl: String,
  mobileNumber: String,
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  description: String,
  country: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: String,
  website: String,
  alternativeMobileNumber: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
