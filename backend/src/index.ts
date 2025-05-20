import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/cookieclicker");

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});