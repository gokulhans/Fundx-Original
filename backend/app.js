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
const feedbackRouter = require("./routes/feedbackRoutes");
const complaintRouter = require("./routes/complaintRoutes");
const subadminRouter = require("./routes/subadminRoutes");
const connectRouter = require("./routes/connectRoutes");

app.use("/api/user", userRouter);
app.use("/api/startup", startupRouter);
app.use("/api/investor", investorRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/subadmin", subadminRouter);
app.use("/api/connect", connectRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
