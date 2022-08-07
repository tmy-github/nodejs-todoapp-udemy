const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json())
app.use(express.static("./public"))

const PORT = 5000;

// ルーティング設計
app.use("/api/v1/tasks", taskRoutes);

// データベースと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, console.log("The server launched"));

    } catch (error) {
        console.log(error);
    }
};

start();
