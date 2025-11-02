const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const taskSchema = new Schema({
    firstName: {
       type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, default: "" },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

module.exports = Task;