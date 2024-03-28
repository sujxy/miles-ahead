import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const handleSignUp = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      mobile,
      gender,
      city,
      current_education,
      password,
    } = req.body;
    const newUser = await UserModel.create({
      name,
      age,
      email,
      mobile,
      gender,
      city,
      current_education,
      password,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      "wqbeibveiubbrifi3qnr2939rnjkvdns",
    );
    res.status(200).json({ message: { token: token } });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const handleSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user && user.password === password) {
      const token = jwt.sign(
        { userId: user._id },
        "wqbeibveiubbrifi3qnr2939rnjkvdns",
      );
      res.status(200).json({
        message: { token: token },
      });
    } else {
      res.status(401).json({
        error: "User not found or invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const getUserData = async () => {
  try {
    const userId = req.userId;
    const userData = await UserModel.findOne({ _id: userId });
    if (!userData) throw new Error("No user exists !");
    delete userData.password;
    res.status(200).json({ message: userData });
  } catch (e) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
