const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const asyncHandler = require("./asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token || null;

  if (!token) {
    const error = new Error("Invalid Token");
    error.statusCode = 400;
    throw error;
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = decodeData;
  const adminData = await Admin.findById(_id).select("-password");
  if (!adminData) {
    const error = new Error("Admin not found");
    error.statusCode = 400;
    throw error;
  }

  req.user = adminData;
  next();
});

module.exports = authMiddleware;
