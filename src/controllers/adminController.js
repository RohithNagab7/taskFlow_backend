const asyncHandler = require("../middlewares/asyncHandler");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const { validateAdminAuthForm } = require("../utils/AdminValidator");

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { isValid, errors } = validateAdminAuthForm(req.body);
  if (!isValid) {
    const error = new Error(errors);
    error.statusCode = 400;
    throw error;
  }

  const isExistingUser = await Admin.findOne({ email });
  if (isExistingUser) {
    const error = new Error("Admin already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ email, password: hashedPassword });
  await newAdmin.save();

  res.status(201).json({ message: "Admin registered successfully" });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { isValid, errors } = validateAdminAuthForm(req.body);
  if (!isValid) {
    const error = new Error(errors);
    error.statusCode = 400;
    throw error;
  }

  const isExistingUser = await Admin.findOne({ email });
  if (!isExistingUser) {
    const error = new Error("Admin does not exist");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await isExistingUser.validatePassword(password);
  if (!isMatch) {
    const error = new Error("Password does not match");
    error.statusCode = 400;
    throw error;
  }

  const token = isExistingUser.generateJWT();
  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Admin Login successfull",
    success: true,
    data: [],
  });
});

module.exports = { registerAdmin, loginAdmin };
