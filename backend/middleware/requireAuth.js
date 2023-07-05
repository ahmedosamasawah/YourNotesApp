// const jsonwebtoken = require("jsonwebtoken");
// const User = require("../Models/userModel");

import User from "../Models/userModel.js";
import jsonwebtoken from "jsonwebtoken";

const requireAuth = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization)
    response.status(401).json({ error: "Authorization token required!" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jsonwebtoken.verify(token, process.env.SECRET);
    request.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    response.status(401).json({ error: "Request is not authorized!" });
  }
};

export default requireAuth;
