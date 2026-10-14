// server.js - entry point of SkillBridge AI
const express = require("express");
const path = require("path");
const analyzeRoutes = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());                                   // read JSON request bodies
app.use(express.static(path.join(__dirname, "public")));   // serve the website

// API routes
app.use("/api", analyzeRoutes);

// Home route (serves the website)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Unknown API route -> JSON 404
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, errors: ["API route not found."] });
});

// Invalid JSON or other errors -> friendly JSON response
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 400 ? "Invalid request data." : "Something went wrong on the server.";
  res.status(status).json({ success: false, errors: [message] });
});

app.listen(PORT, () => {
  console.log(`SkillBridge AI running at http://localhost:${PORT}`);
});
