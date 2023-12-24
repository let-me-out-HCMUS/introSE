const mongoose = require("mongoose");

const CauThuSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  Ten: {
    type: String,
    required: true,
  },
  LoaiCauThu: {
    type: String,
    enum: ["Trong nuoc", "Ngoai nuoc"],
    required: true,
  },
  DoiBong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoiBong",
    required: true,
  },
  SoAo: {
    type: Number,
    required: true,
  },
  TongSoBanThang: {
    type: Number,
    default: 0,
  },
});

const CauThu = mongoose.model("CauThu", CauThuSchema);

module.exports = CauThu;
