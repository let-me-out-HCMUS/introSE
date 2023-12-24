const QuyDinh = require("../models/QuyDinh");
const catchAsync = require("../utils/catchAsync");

exports.getRule = catchAsync(async (req, res, next) => {
  const quydinh = await QuyDinh.find();
  res.status(200).json({
    status: "success",
    data: {
      quydinh,
    },
  });
});

exports.createRule = catchAsync(async (req, res, next) => {
  const quydinh = await QuyDinh.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      quydinh,
    },
  });
});
