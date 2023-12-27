const Rule = require("../models/Rule");
const catchAsync = require("../utils/catchAsync");

exports.getRule = catchAsync(async (req, res, next) => {
  const rule = await Rule.find();
  res.status(200).json({
    status: "success",
    data: {
      rule,
    },
  });
});

exports.createRule = catchAsync(async (req, res, next) => {
  const rule = await Rule.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      rule,
    },
  });
});
