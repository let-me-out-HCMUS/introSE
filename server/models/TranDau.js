const mongoose = require("mongoose");

const TranDauSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  Doi1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoiBong",
    required: true,
  },
  Doi2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoiBong",
    required: true,
  },
  NgayThiDau: {
    type: Date,
    required: true,
  },
  San: { type: String },
  TySo: { type: String },
});

const TranDau = mongoose.model("TranDau", TranDauSchema);

module.exports = TranDau;
