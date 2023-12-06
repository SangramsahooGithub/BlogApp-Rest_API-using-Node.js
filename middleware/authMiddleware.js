import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const requireSignin = async (req, res, next) => {
  try {
    const payload = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(payload); // _id
    if (!payload) {
      res.status(401).send({
        success: false,
        error,
        message: "Auth failed! plz login again",
      });
    } else {
      req.user = payload;
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
      message: "Error in json webtoken",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "Admin access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
