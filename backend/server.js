const express = require("express");
const cors = require("cors");
require("dotenv").config();
const groupsRoutes = require("./routes/groups");
const membersRoutes = require("./routes/members");
const contributionsRoutes = require("./routes/contributions");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use("/groups", groupsRoutes);
app.use("/members", membersRoutes);
app.use("/contributions", contributionsRoutes);

app.get("/", (req, res) => {
  res.send("Ajo Savings Tracker API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
