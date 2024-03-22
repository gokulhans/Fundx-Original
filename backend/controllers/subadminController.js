const Subadmin = require("../models/subadmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const subadminController = {
  signin: async (req, res) => {
    console.log("received from signin subadmin");
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
      }
      const subadmin = await Subadmin.findOne({ email });
      if (!subadmin) {
        res.status(401);
        throw new Error("No user found");
      }
      if (subadmin && (await bcrypt.compare(password, subadmin.password))) {
        res.json({
          id: subadmin.id,
          name: subadmin.firstname,
          email: subadmin.email,
          // You may choose to return additional data if needed
        });
      } else {
        res.status(401);
        throw new Error("Password is incorrect");
      }
    } catch (e) {
      console.log(e);
    }
  },

  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const avalableUser = await Subadmin.findOne({ email });
      if (avalableUser) {
        res.status(400);
        throw new Error("Email already been registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const subadmin = await Subadmin.create({
        name,
        email,
        password: hashedPassword,
      });

      console.log(`Subadmin created success ${subadmin}`);
      res.status(200).json({ msg: "Subadmin create Success", data: subadmin });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating subadmin", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const subadmin = await Subadmin.find();
      res.json({ msg: "OK", data: subadmin });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching subadmin", error: error.message });
    }
  },
  removeSubadmin: async (req, res) => {
    const { subAdminId } = req.body;
    console.log("This is recived from remove subadmin ", req.body);
    const result = await Subadmin.findByIdAndDelete(subAdminId);
    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    } else {
      return res.status(200).json({ message: "Document deleted successfully" });
    }
  },
};

module.exports = subadminController;
