const mongoose = require("mongoose");

const connectsSchema = new mongoose.Schema({
  startup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Startup",
    required: true,
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Investor",
    required: true,
  },
});

const Connect = mongoose.model("Connect", connectsSchema);

module.exports = Connect;
