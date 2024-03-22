const Connect = require("../models/connect");
const Startup = require("../models/startup");

const connectController = {
  // Create a new connect
  create: async (req, res) => {
    try {
      const { startup, investor } = req.body;
      const newConnect = new Connect({ startup, investor });
      await newConnect.save();
      res.status(201).json({ msg: "Connect created", data: newConnect });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating connect", error: error.message });
    }
  },

  // Controller function to get connections by user ID
  getAllById: async (req, res) => {
    try {
      // Extract user ID and type from request params
      const { id, type } = req.params;

      let data;

      // Check the user type
      if (type === "investor") {
        // Find connections where the investor ID matches the provided user ID
        data = await Connect.find({ investor: id }).populate("startup");
      } else if (type === "startup") {
        // Find startup details where the userid matches the provided user ID
        data = await Startup.find({ userid: id });
        console.log(data);
      }

      // Send success response with the retrieved data
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting data by user ID:", error);
      // Send error response
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = connectController;
