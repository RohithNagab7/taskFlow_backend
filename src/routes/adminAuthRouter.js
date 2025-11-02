const express = require("express");
const {registerAdmin, loginAdmin} = require("../controllers/adminController");

const adminAuthRouter = express.Router();

adminAuthRouter.post("/register", registerAdmin);
adminAuthRouter.post("/login", loginAdmin);

module.exports = adminAuthRouter;
