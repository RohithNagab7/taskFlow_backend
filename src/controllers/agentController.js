const asyncHandler = require("../middlewares/asyncHandler");
const Agent = require("../models/agent");
const { redistributeExistingTasks } = require("../services/taskService");
const validateAgent = require("../utils/agentValidator");

const createAgent = asyncHandler(async (req, res) => {
  const { name, mobileNumber, email, password } = req.body;
  const { isValid, errors } = validateAgent(req.body);

  if (!isValid) {
    const error = new Error(Object.values(errors).join(","));
    error.statusCode = 400;
    throw error;
  }

  const existingAgent = await Agent.findOne({ email });
  if (existingAgent) {
    const error = new Error("Agent already exists");
    error.statusCode = 400;
    throw error;
  }

  const agent = await Agent.create({ name, email, password, mobileNumber });
  const agentsData = await Agent.find().select("-password");
  const updatedAgents = await redistributeExistingTasks();
  console.log(updatedAgents);
  res.status(200).json({
    success: true,
    data: agentsData,
    message: "Agent Successfully Added",
  });
});

const getAllAgents = asyncHandler(async (req, res) => {
  const agentsData = await Agent.find().select("-password");
  res.status(200).json({
    success: true,
    data: agentsData,
    message: "Agents Data",
  });
});

const deleteAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const agent = await Agent.findById(id);
  if(!agent) {
    const err = new Error("Agent not found");
    err.statusCode = 404;
    throw err;
  }

  await agent.deleteOne();
   const agentsData = await Agent.find().select("-password");
   const updatedAgents = await redistributeExistingTasks();
   console.log(updatedAgents);
  res.status(200).json({
    success: true,
    data: agentsData,
    message: "Agents Data",
  });
});

module.exports = { createAgent, getAllAgents, deleteAgent };
