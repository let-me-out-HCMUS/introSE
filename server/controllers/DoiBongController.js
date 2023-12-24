const DoiBong = require("../models/DoiBong");
const catchAsync = require("../utils/catchAsync");

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await DoiBong.find();
  res.status(200).json({
    status: "success",
    data: {
      teams,
    },
  });
});

exports.createTeam = catchAsync(async (req, res, next) => {
  const team = await DoiBong.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      team,
    },
  });
});

exports.getTeam = catchAsync(async (req, res, next) => {
  const team = await DoiBong.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});
