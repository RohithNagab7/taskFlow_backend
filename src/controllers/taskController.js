const asyncHandler = require("../middlewares/asyncHandler");
const {
  parseCSV,
  distributeTasks,
  saveTasksToDB,
  getAgentsWithTasks,
} = require("../services/taskService");

const uploadAndDistributeTasks = asyncHandler(async (req, res) => {
  if (!req.file) throw new Error("No file uploaded");

  const parsedTasks = await parseCSV(req.file.buffer);
  if (!parsedTasks.length) throw new Error("CSV file is empty or invalid");

  const distributedTasks = await distributeTasks(parsedTasks);
  const savedCount = await saveTasksToDB(distributedTasks);
    const updatedAgents = await getAgentsWithTasks();

  res.status(201).json({
    success: true,
    message: `Distributed ${savedCount} tasks successfully.`,
     data: updatedAgents,
  });
});

const getAllAgentsWithTasks = asyncHandler(async (req, res) => {
  const data = await getAgentsWithTasks();
  res.status(200).json({ success: true, message: "Successfully retreived the csv file data", data: data });
});

module.exports = { uploadAndDistributeTasks, getAllAgentsWithTasks };
