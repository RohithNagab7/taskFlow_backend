const express = require("express");
const upload = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  uploadAndDistributeTasks,
  getAllAgentsWithTasks,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post("/upload", authMiddleware, upload.single("file"), uploadAndDistributeTasks);
taskRouter.get("/getagenttask", authMiddleware, getAllAgentsWithTasks);

module.exports = taskRouter;
