const Rule = require("../models/Rule");
const catchAsync = require("../utils/catchAsync");

// Get rules
exports.getRule = catchAsync(async (req, res, next) => {
  const rule = await Rule.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      rule,
    },
  });
});

// Update rule
exports.updateRule = catchAsync(async (req, res, next) => {
  const rule = await Rule.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      rule,
    },
  });
});
