const mongoose = require("mongoose");

const BanThangSchema = new mongoose.Schema({
  _idTranDau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TranDau",
    required: true,
  },
  CauThuGhiBan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CauThu",
    required: true,
  },
  LoaiBanThang: {
    type: String,
    enum: ["A", "B", "C"],
    required: true,
  },
  ThoiDiem: {
    type: Number,
    min: 0,
    max: 96,
    required: true,
  },
});

const BanThang = mongoose.model("BanThang", BanThangSchema);

module.exports = BanThang;
