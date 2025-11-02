const express = require("express");
const { createAgent, getAllAgents, deleteAgent } = require("../controllers/agentController");
const authMiddleware = require("../middlewares/authMiddleware");

const agentRouter = express.Router();

agentRouter.use(authMiddleware);

agentRouter.post("/agent", createAgent);
agentRouter.get("/agent", getAllAgents);
agentRouter.delete("/agent/:id", deleteAgent);

module.exports = agentRouter;