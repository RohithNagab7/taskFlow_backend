const mongoose = require("mongoose");
const { isLowercase } = require("validator");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { model, Schema } = mongoose;

const agentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must be atleast 3 letters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
 mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          // ✅ Clean spaces/dashes and check country code format
          const cleaned = v.replace(/[\s-]/g, "");
          return /^\+\d{10,15}$/.test(cleaned);
        },
        message: "Invalid mobile number format. Must include country code.",
      },
    },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be atleast 6 letters"],
  },
}, {
  timestamps: true,
  versionKey: false,
});

agentSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

const Agent = model("Agent", agentSchema);

module.exports = Agent;
