const mongoose = require("mongoose");

// Define the schema
const investorSchema = new mongoose.Schema({
  linkedInUrl: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assetsOver2Cr: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  professionalHeadline: {
    type: String,
    required: true,
  },
  webSiteUrl: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  alternativeMobileNumber: {
    type: String,
    required: true,
  },
});

// Create the model
const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
