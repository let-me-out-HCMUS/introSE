const mongoose = require("mongoose");

const DoiBongSchema = new mongoose.Schema({
  TenDoiBong: {
    type: String,
    required: true,
  },
  Thang: {
    type: Number,
    default: 0,
  },
  Thua: {
    type: Number,
    default: 0,
  },
  Hoa: {
    type: Number,
    default: 0,
  },
  HieuSo: {
    type: Number,
    default: 0,
  },
  Hang: {
    type: Number,
    default: 0,
  },
});

const DoiBong = mongoose.model("DoiBong", DoiBongSchema);

module.exports = DoiBong;
