const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// SOLUTION: Add middleware for parsing JSON and enabling CORS
app.use(cors());
app.use(express.json());

// SOLUTION: Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/studentblog")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// SOLUTION: Import and use the posts routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Student Blog API is running!" });
});

// SOLUTION: Add error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    error: error.message || "Internal server error",
  });
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// SOLUTION: Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
