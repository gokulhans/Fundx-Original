const mongoose = require("mongoose");

const subadminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the firstname"],
    },

    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "email already registerd"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subadmin", subadminSchema);
