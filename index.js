require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const origin = IS_PRODUCTION ? process.env.ORIGIN : "http://127.0.0.1:5173";
const cors = require("cors");

app.use(
  cors({
    // origin: "http://127.0.0.1:5173",
    origin: "https://notion-clone-client.vercel.app/",
  })
);
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("Server starting...");
});
