const Startup = require("../models/startup");
const User = require("../models/user");

const startupController = {
  create: async (req, res) => {
    try {
      const {
        userid,
        picture,
        name,
        fullname,
        linkedInUrl,
        mobileNumber,
        email,
        dateOfBirth,
        occupation,
        companyName,
        description,
        country,
        gender,
        location,
        website,
        alternativeMobileNumber,
      } = req.body;

      const newStartup = new Startup({
        userid,
        picture,
        name,
        fullname,
        linkedInUrl,
        mobileNumber,
        email,
        dateOfBirth,
        occupation,
        companyName,
        description,
        country,
        gender,
        location,
        website,
        alternativeMobileNumber,
      });

      await newStartup.save();

      const user = await User.findByIdAndUpdate(
        userid,
        { type: "startup" },
        { new: true }
      );
      
      console.log(user);

      res.json({ msg: "Startup created", data: newStartup });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating startup", error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const startups = await Startup.find();
      res.json({ msg: "OK", data: startups });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching startups", error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const startupId = req.params.id;
      const startup = await Startup.findById(startupId);
      if (startup) {
        res.json({ msg: "Startup found", data: startup });
      } else {
        res.status(404).json({ msg: "Startup not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching startup", error: error.message });
    }
  },

  updateById: async (req, res) => {
    try {
      const {
        picture,
        name,
        fullname,
        linkedInUrl,
        mobileNumber,
        email,
        dateOfBirth,
        occupation,
        companyName,
        description,
        country,
        gender,
        location,
        website,
        alternativeMobileNumber,
      } = req.body;

      const updatedStartup = await Startup.findOneAndUpdate(
        { _id: req.params.id },
        {
          picture,
          name,
          fullname,
          linkedInUrl,
          mobileNumber,
          email,
          dateOfBirth,
          occupation,
          companyName,
          description,
          country,
          gender,
          location,
          website,
          alternativeMobileNumber,
        },
        { new: true }
      );

      if (updatedStartup) {
        res.json({ msg: "Startup updated", data: updatedStartup });
      } else {
        res.status(404).json({ msg: "Startup not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error updating startup", error: error.message });
    }
  },

  deleteById: async (req, res) => {
    try {
      const deletedStartup = await Startup.findOneAndDelete({
        _id: req.params.id,
      });

      if (deletedStartup) {
        res.json({ msg: "Startup deleted", data: deletedStartup });
      } else {
        res.status(404).json({ msg: "Startup not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting startup", error: error.message });
    }
  },
};

module.exports = startupController;
