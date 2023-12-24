const BanThang = require("../models/BanThang");
const CauThu = require("../models/CauThu");
const DoiBong = require("../models/DoiBong");
const TranDau = require("../models/TranDau");
const catchAsync = require("../utils/catchAsync");

exports.getAllGoals = catchAsync(async (req, res, next) => {
  const goals = await BanThang.find()
    .populate("CauThuGhiBan")
    .populate("_idTranDau");
  res.status(200).json({
    status: "success",
    data: {
      goals,
    },
  });
});

exports.getAGoal = catchAsync(async (req, res, next) => {
  const goal = await BanThang.findById(req.params.id)
    .populate("CauThu")
    .populate("TranDau");
  res.status(200).json({
    status: "success",
    data: {
      goal,
    },
  });
});

exports.createGoal = catchAsync(async (req, res, next) => {
  // Example request body:
  /*   {
    "Doi1":"Manchester United",
    "Doi2":"Real Madrid",
    "CauThuGhiBan":"Cristiano Ronaldo",
    "LoaiBanThang":"A",
    "ThoiDiem":10
} */

  // Find id of team
  const Doi1 = await DoiBong.findOne({ TenDoiBong: req.body.Doi1 });
  const Doi2 = await DoiBong.findOne({ TenDoiBong: req.body.Doi2 });
  // Find match has 2 teams
  const match = await TranDau.findOne({
    Doi1: Doi1._id,
    Doi2: Doi2._id,
  });
  if (!match) {
    return res.status(404).json({
      status: "fail",
      message: "Tran dau khong ton tai",
    });
  }
  // Find player
  const cauThu = await CauThu.findOne({ TenCauThu: req.body.CauThu });
  if (!cauThu) {
    return res.status(404).json({
      status: "fail",
      message: "Cau thu khong ton tai",
    });
  }

  // Create goal
  const goadObj = {
    _idTranDau: match._id,
    CauThuGhiBan: cauThu._id,
    ThoiDiem: req.body.ThoiDiem,
    LoaiBanThang: req.body.LoaiBanThang,
  };

  const goal = await BanThang.create(goadObj);
  res.status(201).json({
    status: "success",
    data: {
      goal,
    },
  });
});
