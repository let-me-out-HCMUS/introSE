const multer = require("multer");
const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");
const bucket = require("../utils/upload");
const APIFeatures = require("../utils/apiFeature");
const Player = require("../models/Player");
const Match = require("../models/Match");

// Get all clubs
exports.getAllClubs = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Club.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const club = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      club,
    },
  });
});

// Create a club
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.uploadImage = upload.single("file");
exports.createClub = catchAsync(async (req, res, next) => {
  // Example request body:
  /* {
    "clubName":"Real Madrid",
    "won":1,
    "lost":10,
    "drawn":0
} */
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
      await blob.makePublic();

      // TODO: Lấy đường dẫn truy cập công khai
      publicUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2025", // Thời gian hết hạn của đường dẫn ký
      });
      const club = await Club.create({
        clubName: req.body.clubName,
        stadium: req.body.stadium,
        won: req.body.won,
        lost: req.body.lost,
        drawn: req.body.drawn,
        image: publicUrl[0],
      });
      res.status(201).json({
        status: "success",
        data: {
          club,
        },
      });
    });
    blobStream.end(req.file.buffer);
  } else {
    const club = await Club.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        club,
      },
    });
  }
});
//  Get a club
exports.getClub = catchAsync(async (req, res, next) => {
  const club = await Club.findById(req.params.id);
  let totalGoal = 0;
  // Calc total goal
  const players = await Player.find({ club: req.params.id });
  players.forEach((player) => {
    totalGoal += player.totalGoal;
  });

  // Calc total won, win rate
  const matches = await Match.find({
    $or: [{ firstClub: req.params.id }, { secondClub: req.params.id }],
  });
  let totalWon = 0;
  let totalLost = 0;
  let totalDrawn = 0;
  matches.forEach((match) => {
    if (match.result && match.time < new Date().toISOString()) {
      const firstClubPoint = Number(match.result.split("-")[0]);
      const secondClubPoint = Number(match.result.split("-")[1]);
      if (firstClubPoint > secondClubPoint) totalWon += 1;
      else if (firstClubPoint < secondClubPoint) totalLost += 1;
      else totalDrawn += 1;
    }
  });
  club.won = totalWon;
  club.lost = totalLost;
  club.drawn = totalDrawn;
  await club.save();
  res.status(200).json({
    status: "success",
    data: {
      club,
      totalGoal,
    },
  });
});

// Update a club
exports.updateClub = catchAsync(async (req, res, next) => {
  const team = await Club.findOne(req.body.id);
  if (!team) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  const newTeam = await Club.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      newTeam,
    },
  });
});

exports.deleteClub = catchAsync(async (req, res, next) => {
  const club = await Club.findByIdAndDelete(req.params.id);
  if (!club) {
    return res.status(404).json({
      status: "fail",
      message: "Club does not exist",
    });
  }
  Player.deleteMany({ club: req.params.id });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
