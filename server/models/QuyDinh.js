const mongoose = require("mongoose");

const QuyDinhSchema = new mongoose.Schema({
  CauThu: {
    TuoiToiThieu: { type: Number, required: true },
    TuoiToiDa: { type: Number, required: true },
    SoLuongToiThieu: { type: Number, required: true },
    SoLuongToiDa: { type: Number, required: true },
    SoLuongCauThuNuocNgoaiToiDa: { type: Number, required: true },
  },
  BanThang: {
    SoLuongLoaiBanThang: {
      type: Number,
      required: true,
    },
    ThoiDiemGhiBanToiDa: { type: Number, required: true },
  },
  XepHang: {
    DiemThang: { type: Number, required: true },
    DiemThua: { type: Number, required: true },
    DiemHoa: { type: Number, required: true },
    ThuTuUuTienXepHang: { type: String },
  },
});

const QuyDinh = mongoose.model("QuyDinh", QuyDinhSchema);

module.exports = QuyDinh;
