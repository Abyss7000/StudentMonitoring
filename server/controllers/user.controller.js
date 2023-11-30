const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const httpStatus = require("http-status");

module.exports.registerUser = async (req, res, next) => {
  console.log("/register");
  const { name, userID, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Email is already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      name,
      userID,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    res
      .status(httpStatus.OK)
      .json({ user: newUser, message: "User registered successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid credentials" });
    }
    console.log(password, user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userID: user.userID,
        role: user.role,
        name: user?.name,
        email: user?.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // You can adjust the expiration time
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "none", // Set to 'none' if your frontend is on a different domain
    });

    res.status(httpStatus.OK).json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res
      .status(httpStatus.OK)
      .json({ users, message: "all user retrieved successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
module.exports.getAllSupervisor = async (req, res, next) => {
  try {
    const supervisors = await User.find({ role: "supervisor" });

    res
      .status(httpStatus.OK)
      .json({ supervisors, message: "all user retrieved successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.changeUserRole = async (req, res, next) => {
  const { userID } = req.params;
  const { role } = req.body;
  console.log(userID, role);
  try {
    const user = await User.findOne({ userID });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();

    res
      .status(httpStatus.OK)
      .json({ user, message: "User Role updated successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(httpStatus.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
