import cloudinary from "../config/cloudinary.js"; 
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../config/datauri.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please provide the missing parameters",
        success: false,
      });
    }

    const file = req.file

    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content)

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    // generate token
    const tokendata = {
      userId: user._id,
    };

    const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // send limited user data
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      email:user.email,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Welcome back",
        user: userData,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (req,res)=>{
    try {
        
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully",
            success:true
        })
    } catch (error) {
         console.log(error);
    return res.status(500).json({ success:false, message:"Server error" });
    }
}


export const updateProfile = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "Please provide all required profile fields",
        success: false
      });
    }

    let cloudResponse;

    // Only upload to cloudinary if file exists
 
if (file) {
  try {
    const fileUri = getDataUri(file);
    console.log("File URI:", fileUri);
    cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      public_id: `resumes/${Date.now()}`,  // Custom filename
      format: 'pdf'  // Force PDF format
    });
    console.log("Cloudinary response:", cloudResponse);
  } catch (err) {
    console.log("Cloudinary upload error:", err);
    return res.status(500).json({
      message: "Failed to upload resume",
      success: false
    });
  }
}
    let skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }

    // Update basic fields
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    // Only update resume if new file was uploaded
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
      success: true
    });

  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
