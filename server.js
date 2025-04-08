import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import nodemailer from "nodemailer";

//import routers
import authRouter from "./routers/authRouter.js";
import coursesRouter from "./routers/coursesRouter.js";
import onlineCoursesRouter from "./routers/onlineCoursesRouter.js";
import usersRouter from "./routers/usersRouter.js";
import cartsRoutes from "./routers/cartRoutes.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import errorHandlerMiddleware from "./middlewares/errorMiddleware.js";

// Configura il trasportatore con le variabili d'ambiente
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

//morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "img-src 'self' data: https://res.cloudinary.com;"
  );
  next();
});

//routes
app.use("/api/access", authRouter);
app.use("/api/cursuri", coursesRouter);
app.use("/api/cursuri-online", onlineCoursesRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartsRoutes);

//default route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//error route
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//error middleware
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 5100;

//DB and server starting
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
} catch (error) {
  process.exit(1);
}
