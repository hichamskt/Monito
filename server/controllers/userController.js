const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail.js");

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
          maxAge: 1 * 60 * 24 * 1000,
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
      return res.status(200).cookie("token", "", { maxAge: 0 , httpOnly: true, sameSite: "strict",}).json({
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

  const sendEmail = async (req,res)=>{
  
    try {

      
      const admin = await User.findOne({ role: "admin" });

      if(!admin){
        return res.status(404).json({
          success:false,
          message :"admin not found"
        })
      }

      const link = `http://localhost:3000/${admin._id}/resetpassword`;
    const htmlTemplate = `
            <div>
                <h1>Click on the link to verify your email</h1>
                <a href="${link}">Verify</a>
            </div>
        `;
    const email = process.env.Admin_Email;
    await sendMail(email, "Email Verification", htmlTemplate);
    console.log('Email sent successfully');

    } catch (error) {
      console.error('Error sending email:', error);
    throw new Error('Email not sent');
    }
    
  }


  const resetPassword = async (req,res)=>{
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(400).json({ message: "User Not Found", success: false });
      }
      const newPassword= req.body.password;
      if (!newPassword) {
        return res.status(400).json({
          message: "messing passsword ",
          success: false,
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword ;
     await user.save();

      return res.status(200).json({
        message: "password Updated successfully",
        success: true,
      });
    } catch (error) {
      console.log(error)
    }
  }

    module.exports = {  login,  logout ,register,sendEmail,resetPassword};