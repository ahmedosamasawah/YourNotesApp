// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const tasksRoutes = require("./routes/tasks");
// const userRoutes = require("./routes/user");

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import tasksRoutes from "./routes/tasks.js";
import userRoutes from "./routes/user.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Express App:
const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Middleware:
app.use(express.json());

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// Routes:
app.use("/api/tasks", tasksRoutes);
app.use("/api/user", userRoutes);

// For Deployment:
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Connecting to Database & Listening to Requests:
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Connected to Database & Listening on Port ${process.env.PORT}...`
      )
    );
  })
  .catch((error) => console.log(error));
