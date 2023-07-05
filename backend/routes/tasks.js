// const express = require("express");
// const requireAuth = require("../middleware/requireAuth");

import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  deleteCompletedTasks,
} from "../controllers/taskController.js";

// Getting Router Method:
const router = express.Router();

// REQUIRE AUTH FOR ALL TASK ROUTES:
router.use(requireAuth);

// GET ALL TASKS:
router.get("/", getTasks);

// GET A SINGLE TASK:
router.get("/:id", getTask);

// POST A NEW TASK:
router.post("/", createTask);

// DELETE A TASK:
router.delete("/:id", deleteTask);

// DELETE COMPLETED TASKS:
router.delete("/", deleteCompletedTasks);

// UPDATE A TASK:
router.put("/:id", updateTask);

export default router;
