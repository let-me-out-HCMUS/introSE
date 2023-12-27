const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");

exports.getAllClubs = catchAsync(async (req, res, next) => {
  const club = await Club.find();
  res.status(200).json({
    status: "success",
    data: {
      club,
    },
  });
});

exports.createClub = catchAsync(async (req, res, next) => {
  // Example request body:
  /* {
    "clubName":"Real Madrid",
    "won":1,
    "lost":10,
    "drawn":0
} */
  const team = await Club.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      team,
    },
  });
});

exports.getClub = catchAsync(async (req, res, next) => {
  const team = await Club.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});
