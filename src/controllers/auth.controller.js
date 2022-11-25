import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const AuthController = {
  //Region get all user
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all user",
      });
    }
  },

  //GET An USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an user",
      });
    }
  },

  //DELETE
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: User,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete user",
      });
    }
  },

  //UPDATE
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update user",
      });
    }
  },

  //End region
  //Region add new user
  createUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }
      const isValidPassword = validator.isLength(req.body.password, 8, 30);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Password must be 8-30 characters",
        });
      }

      const data = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      // const dataToSave = await data.save();
      // res.status(200).json(dataToSave);
      await User.create(data);
      return res.status(200).json({ status: true, message: "User created" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
  //Region login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Username does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
      return res.status(200).json({ success: true, message: "Login success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
};
