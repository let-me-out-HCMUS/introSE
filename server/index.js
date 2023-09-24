const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Database connection
const DB_URI = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASSWORD,
);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect to database successful !");
  });

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
