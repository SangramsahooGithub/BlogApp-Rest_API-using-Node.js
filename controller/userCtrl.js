import { comparePassword, hashpassword } from "../helpers/passwordHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.send({ success: false, message: "Name is Required" });
    }
    if (!email) {
      return res.send({ success: false, message: "Email is Required" });
    }
    if (!password) {
      return res.send({ success: false, message: "Password is Required" });
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    const hashedPassword = await hashpassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "Succesfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during registration",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "invalid credentials",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "password not matched",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "succesfully loggedin",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        answer: user.answer,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "login failed",
      error,
    });
  }
};
