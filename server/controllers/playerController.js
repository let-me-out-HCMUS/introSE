const Player = require("../models/Player");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");
const bucket = require("../utils/upload");
const multer = require("multer");

// Get all players
exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find().populate("Club");

  res.status(200).json({
    status: "success",
    data: {
      players,
    },
  });
});

// Get a player
exports.getAPlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate("Club");
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

// Create a player
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.uploadImage = upload.single("file");
exports.createPlayer = catchAsync(async (req, res, next) => {
  // Example request body:
  /*   
  {
    "name":"Cristiano Ronaldo",
    "type":"Ngoài nước",
    "clubName":"Manchester United",
    "shirtNum":7,
    "totalGoal":0
} */
  const club = await Club.findOne({ clubName: req.body.clubName });
  if (!club) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  let publicUrl = "";
  if (req.file) {
    const { file } = req;
    const fileName = `${Date.now()}_${file.originalname}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", async () => {
      // Đặt quyền truy cập đọc công khai thành true
      await blob.makePublic();

      // TODO: Lấy đường dẫn truy cập công khai
      publicUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2025", // Thời gian hết hạn của đường dẫn ký
      });
      const player = await Player.create({
        name: req.body.name,
        type: req.body.type,
        club: club._id,
        shirtNum: req.body.shirtNum,
        totalGoal: req.body.totalGoal,
        image: publicUrl[0],
      });
      res.status(201).json({
        status: "success",
        data: {
          player,
        },
      });
    });
    blobStream.end(file.buffer);
  } else {
    req.body.club = club._id;
    const player = await Player.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        player,
      },
    });
  }
});

// Update a player
exports.updatePlayer = catchAsync(async (req, res, next) => {
  const player = Player.findOne(req.body.id);
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Player does not exist",
    });
  }
  const club = await Club.findOne({ clubName: req.body.clubName });
  if (!club) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  req.body.club = club._id;
  player.name = req.body.name;
  player.type = req.body.type;
  player.club = req.body.club;
  player.shirtNum = req.body.shirtNum;
  player.totalGoal = req.body.totalGoal;
  await player.save();
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

// Delete a player
exports.deletePlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Player does not exist",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
