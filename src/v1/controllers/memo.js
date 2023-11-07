const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const maxPositionMemo = await Memo.findOne({ user: req.user._id })
      .sort("-position")
      .limit(1);
    const maxPosition = maxPositionMemo ? maxPositionMemo.position : 0;
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: maxPosition + 1,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json();
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("createdAt");
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json();
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json();
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください";

    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json();
  }
};

exports.toggleFavorite = async (req, res) => {
  const { memoId } = req.params;
  const { favorite } = req.body;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    const maxFavoritePositionMemo = await Memo.findOne({ user: req.user._id })
      .sort("-favoritePosition")
      .limit(1);
    const maxFavoritePosition = maxFavoritePositionMemo
      ? maxFavoritePositionMemo.favoritePosition
      : 0;
    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      favorite: favorite,
      favoritePosition: favorite ? maxFavoritePosition + 1 : 0,
    });
    res.status(200).json(updatedMemo);
  } catch (err) {
    res.status(500).json();
  }
};

exports.delete = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json();
  }
};
