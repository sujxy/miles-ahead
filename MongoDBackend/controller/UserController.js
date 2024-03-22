import userModel from "../models/User.js";

const CreateUser = async (req, res) => {
  try {
    console.log("Request received for new user");
    const { name, age, email, mobile, gender, city, current_education, password } = req.body;
    const newUser = new userModel({
      name,
      age,
      email,
      mobile,
      gender,
      city,
      current_education,
      password
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "New account created", newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error from backend" });
    console.log(error);
  }
};


const ValidateUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
  
      if (user && user.password === password) {
        res.status(200).json({
          success: true,
          message: "Login successful"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User not found or invalid credentials"
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Error from backend" });
      console.log(error);
    }
  };
  

export {CreateUser,ValidateUser} ;