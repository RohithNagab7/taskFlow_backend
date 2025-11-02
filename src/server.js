const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 7777;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
    console.log("Connection Established and listening to the port 7777")
})
    } catch(err) {
        console.error("Failed to connect to the Server");
        process.exit(1);
    }
};

startServer();

