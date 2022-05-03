import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";

import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("api running sucessfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`running on port ${PORT}`));
