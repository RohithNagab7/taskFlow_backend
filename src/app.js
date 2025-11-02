const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const adminAuthRouter = require("./routes/adminAuthRouter");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const agentRouter = require("./routes/agentRouter");
const taskRouter = require("./routes/taskRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,               // allow cookies or headers like Authorization
  })
);
app.use(helmet());

app.use("/", adminAuthRouter);
app.use("/", agentRouter);
app.use("/", taskRouter)

app.use(errorHandler);

module.exports = app;