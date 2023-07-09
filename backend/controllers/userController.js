// const validator = require("validator");
// const { ObjectId } = require("mongoose").Types;
// const User = require("../Models/userModel");
// const JsonWebToken = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// import {ObjectId} from 'mongoose'

import User from '../Models/userModel.js';
import validator from 'validator';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createToken = _id => {
  return JsonWebToken.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signup user
const signupUser = async (request, response) => {
  const { email, password, confirmPass, username, phone, birthday } =
    request.body;

  try {
    const user = await User.signup(
      email,
      password,
      confirmPass,
      username,
      phone,
      birthday
    );

    // Create Token:
    const token = createToken(user._id);

    response.status(200).json({
      message: 'Signup successful, You can Signin now!',
      email,
      token,
      confirmPass,
      username,
      phone,
      birthday,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Signin user
const signinUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.signin(email, password);

    // Create Token:
    const token = createToken(user._id);

    // Omit confirmPass from the user object
    const { confirmPass, ...userData } = user._doc;

    response.status(200).json({ user: userData, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update User
const updateUser = async function (request, response) {
  const { id } = request.params;
  const { email, password, username, phone, birthday } = request.body;
  const exist = await User.findOne({ email });

  try {
    let updatedUser;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the user data with the new password
      updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            email,
            password: hashedPassword,
            username,
            phone,
            birthday,
          },
        },
        { new: true }
      );
    } else {
      // Update the user data without changing the password
      updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            email,
            username,
            phone,
            birthday,
          },
        },
        { new: true }
      );
    }

    if (!updatedUser) {
      throw new Error('User not found');
    }

    if (exist) throw Error('This email already exists!');
    if (!validator.isEmail(updatedUser.email))
      throw Error('Email is not valid!');
    if (!validator.isStrongPassword(updatedUser.password))
      throw Error("Password not strong enough!, example: 'Ahmed@742002'");

    const token = createToken(updatedUser._id);
    response.status(200).json({ user: updatedUser, token });
  } catch (error) {
    if (error.code === 11000) {
      response.status(400).json({
        error: 'This email is already exist!',
      });
    } else {
      response.status(400).json({ error: error.message });
    }
  }
};

export { signupUser, signinUser, updateUser };
