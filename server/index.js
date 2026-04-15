const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
console.log( process.env.CLIENT_URL)
app.use(
  cors({
    origin:"https://gymwebsite-1-ft70.onrender.com/",
    credentials: true
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "UrbanFit API is running",
    health: "ok"
  });
});

app.use("/api/classes", require("./routes/classes"));
app.use("/api/trainers", require("./routes/trainers"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/trials", require("./routes/trials"));
app.use("/api/auth", require("./routes/auth"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});
