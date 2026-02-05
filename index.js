const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db"); // ✅ IMPORT HERE
const authRoutes = require("./routes/user");

const app = express();
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
