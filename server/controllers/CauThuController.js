const CauThu = require("../models/CauThu");
const catchAsync = require("../utils/catchAsync");
const DoiBong = require("../models/DoiBong");

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await CauThu.find().populate("DoiBong");

  res.status(200).json({
    status: "success",
    data: {
      players,
    },
  });
});

exports.getAPlayer = catchAsync(async (req, res, next) => {
  const player = await CauThu.findById(req.params.id).populate("DoiBong");
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

exports.createPlayer = catchAsync(async (req, res, next) => {
  const team = await DoiBong.findOne({ TenDoiBong: req.body.DoiBong });
  if (!team) {
    return res.status(404).json({
      status: "fail",
      message: "Doi bong khong ton tai",
    });
  }
  req.body.DoiBong = team._id;
  const player = await CauThu.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      player,
    },
  });
});
