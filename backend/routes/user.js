// const express = require("express");
import express from "express";
const router = express.Router();

// Controller Functions:
import {
  signupUser,
  signinUser,
  updateUser,
} from "../controllers/userController.js";

// Signup router
router.post("/signup", signupUser);

// Signin router
router.post("/signin", signinUser);

// Update user router
router.patch("/:id", updateUser);

export default router;
