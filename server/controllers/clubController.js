const Club = require("../models/Club");
const catchAsync = require("../utils/catchAsync");
const bucket = require("../utils/upload");
const multer = require("multer");

// Get all clubs
exports.getAllClubs = catchAsync(async (req, res, next) => {
  const club = await Club.find();
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
  const team = await Club.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      team,
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
