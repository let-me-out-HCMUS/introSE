const TranDau = require("../models/TranDau");
const DoiBong = require("../models/DoiBong");
const catchAsync = require("../utils/catchAsync");

exports.getAllMatches = catchAsync(async (req, res, next) => {
  const matches = await TranDau.find().populate("Doi1").populate("Doi2");

  res.status(200).json({
    status: "success",
    data: {
      matches,
    },
  });
});

exports.getMatch = catchAsync(async (req, res, next) => {
  const match = await TranDau.findById(req.params.id)
    .populate("Doi1")
    .populate("Doi2");

  res.status(200).json({
    status: "success",
    data: {
      match,
    },
  });
});

exports.createMatch = catchAsync(async (req, res, next) => {
  const Doi1 = await DoiBong.findOne({ TenDoiBong: req.body.Doi1 });
  const Doi2 = await DoiBong.findOne({ TenDoiBong: req.body.Doi2 });
  if (!Doi1 || !Doi2) {
    return res.status(404).json({
      status: "fail",
      message: "Doi bong khong ton tai",
    });
  }
  req.body.Doi1 = Doi1._id;
  req.body.Doi2 = Doi2._id;
  const match = await TranDau.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      match,
    },
  });
});
