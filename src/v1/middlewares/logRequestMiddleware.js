const logRequestMiddleware = (req, res, next) => {
  // 日本時間の現在時刻を取得
  const japanTime = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });

  console.log("Current Time (Japan):", japanTime);
  console.log("Request Path:", req.path);
  console.log("Request Method:", req.method);
  console.log("Request Origin:", req.get("origin"));

  next();
};

module.exports = logRequestMiddleware;
