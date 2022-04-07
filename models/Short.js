const mongoose = require("mongoose");

const ShortSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shortedCode: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Short", ShortSchema);
