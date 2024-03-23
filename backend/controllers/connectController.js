const Connect = require("../models/connect");
const Startup = require("../models/startup");
const Investor = require("../models/investor");

const connectController = {
  // Create a new connect
  create: async (req, res) => {
    try {
      const { startup, investor } = req.body;
      const newConnect = new Connect({ startup, investor });
      let connection = await newConnect.save();
      console.log(connection);
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

      console.log(id, type);

      let data;
      if (type === "investor") {
        data = await Connect.find({ investor: id });
        data = await Investor.populate(data, { path: "startup" });
      } else if (type === "startup") {
        data = await Connect.find({ startup: id });
        data = await Connect.populate(data, { path: "investor" });
      }

      console.log(data);

      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting data by user ID:", error);
      // Send error response
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = connectController;
