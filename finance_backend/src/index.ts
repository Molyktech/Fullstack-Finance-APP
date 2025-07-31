import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import connectDB from "./databse/databse";
import { errorHandler } from "./midllewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";


const app = express();
const PORT = config.PORT ;
const BASE_PATH = config.BASE_PATH;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: config.APP_ORIGIN,
  credentials: true,
}));



app.get("/", (req, res) => {
  res.send("Welcome to the Finance Backend API");
});

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(errorHandler)

app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}${BASE_PATH}`);
  await connectDB();
});