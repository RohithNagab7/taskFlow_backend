const csv = require("csv-parser");
const { Readable } = require("stream");
const Task = require("../models/task");
const Agent = require("../models/agent");

const parseCSV = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(fileBuffer.toString());

    stream
      .pipe(csv(["FirstName", "Phone", "Notes"]))
      .on("data", (data) => {
        if (data.FirstName && data.Phone) {
          results.push({
            firstName: data.FirstName.trim(),
            phone: data.Phone.trim(),
            notes: data.Notes?.trim() || "",
          });
        }
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const distributeTasks = async (tasks) => {
  const agents = await Agent.find();
  if (!agents.length) throw new Error("No agents found to assign tasks");

  const distributedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const agent = agents[i % agents.length];
    distributedTasks.push({ ...tasks[i], agentId: agent._id });
  }
  return distributedTasks;
};

const saveTasksToDB = async (distributedTasks) => {
  await Task.insertMany(distributedTasks);
  return distributedTasks.length;
};

const getAgentsWithTasks = async () => {
  return await Agent.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "agentId",
        as: "tasks",
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        mobileNumber: 1,
        tasks: {
          firstName: 1,
          phone: 1,
          notes: 1,
        },
      },
    },
  ]);
};

const redistributeExistingTasks = async () => {
  const agents = await Agent.find();
  const tasks = await Task.find();

  if (!agents.length || !tasks.length) {
    console.log("No agents or tasks found, skipping redistribution.");
    return [];
  }

  // Reuse the same logic
  const redistributedTasks = await distributeTasks(tasks);

  // Clear old tasks and re-insert
  await Task.deleteMany({});
  await Task.insertMany(redistributedTasks);

  // Return the updated agent-task mapping
  return await getAgentsWithTasks();
};

module.exports = {
  parseCSV,
  distributeTasks,
  saveTasksToDB,
  getAgentsWithTasks,
  redistributeExistingTasks,
};
