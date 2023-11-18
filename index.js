require("dotenv").config();
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const origin = IS_PRODUCTION ? process.env.ORIGIN : "http://127.0.0.1:5173";
const cors = require("cors");
console.log("origin", origin);

// カスタムミドルウェアを定義
const logOriginMiddleware = (req, res, next) => {
  console.log("Request Origin:", req.get("origin"));
  next();
};

// 使用するミドルウェアを設定
app.use(logOriginMiddleware);

app.use(
  cors({
    origin: origin,
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
