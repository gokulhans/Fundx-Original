const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json());

app.use(cors());

const userRouter = require("./routes/userRoutes");
const startupRouter = require("./routes/startupRoutes");
const investorRouter = require("./routes/investorRoutes");

app.use("/api/user", userRouter);
app.use("/api/startup", startupRouter);
app.use("/api/investor", investorRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
