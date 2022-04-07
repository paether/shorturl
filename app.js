const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const shortRouter = require("./routes/shorturl");
const redirectRouter = require("./routes/redirect");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 8800;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "/client/build")));

app.set("view engine", "ejs");

app.use("/api", shortRouter);
app.use("/", redirectRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Express server listening on: ${port}`);
  connectDB();
});

module.exports = app;
