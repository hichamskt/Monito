const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Somthing went  Wrong",
          success: false,
        });
      }
  
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email ",
          success: false,
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

      const tokenData = {
        userId: user._id,
      };
  
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
  
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpsOnly: true,
          sameSite: "strict",
        })
        .json({
          message: `login successfuly`,
          user,
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
  };
  

  const logout = async (req, res) => {
    try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logged out successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  
  const register = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if ( !email || !password) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
      
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      
      
      
      
      
      return res.status(201).json({
        message:
          "Account has been created.",
          success: true,
        });
      } catch (error) {
        console.log(error);
      }
    };
    module.exports = {  login,  logout ,register};