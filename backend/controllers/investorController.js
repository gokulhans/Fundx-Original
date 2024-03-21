const Investor = require("../models/investor");

const investorController = {
  create: async (req, res) => {
    try {
      const {
        linkedInUrl,
        firstname,
        mobileNumber,
        description,
        assetsOver2Cr,
        country,
        gender,
        location,
        professionalHeadline,
        webSiteUrl,
        summary,
        alternativeMobileNumber,
      } = req.body;
      const newInvestor = new Investor({
        linkedInUrl,
        firstname,
        mobileNumber,
        description,
        assetsOver2Cr,
        country,
        gender,
        location,
        professionalHeadline,
        webSiteUrl,
        summary,
        alternativeMobileNumber,
      });
      await newInvestor.save();
      res.json({ msg: "Investor created", data: newInvestor });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating investor", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const investors = await Investor.find();
      res.json({ msg: "OK", data: investors });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching investors", error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const investorId = req.params.id;
      const investor = await Investor.findById(investorId);
      if (investor) {
        res.json({ msg: "Investor found", data: investor });
      } else {
        res.status(404).json({ msg: "Investor not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching investor", error: error.message });
    }
  },
  updateById: async (req, res) => {
    try {
      const {
        linkedInUrl,
        firstname,
        mobileNumber,
        description,
        assetsOver2Cr,
        country,
        gender,
        location,
        professionalHeadline,
        webSiteUrl,
        summary,
        alternativeMobileNumber,
      } = req.body;
      const updatedInvestor = await Investor.findOneAndUpdate(
        { _id: req.params.id },
        {
          linkedInUrl,
          firstname,
          mobileNumber,
          description,
          assetsOver2Cr,
          country,
          gender,
          location,
          professionalHeadline,
          webSiteUrl,
          summary,
          alternativeMobileNumber,
        },
        { new: true }
      );
      if (updatedInvestor) {
        res.json({ msg: "Investor updated", data: updatedInvestor });
      } else {
        res.status(404).json({ msg: "Investor not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating investor", error: error.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const deletedInvestor = await Investor.findOneAndDelete({
        _id: req.params.id,
      });
      if (deletedInvestor) {
        res.json({ msg: "Investor deleted", data: deletedInvestor });
      } else {
        res.status(404).json({ msg: "Investor not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting investor", error: error.message });
    }
  },
};

module.exports = investorController;
