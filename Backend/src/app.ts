import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes/studentsRoutes";
dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
      credentials:true
}));
app.use(express.json());

app.use("/api/students", router);

export default app;
