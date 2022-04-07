const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const Short = require("./models/Short");

const createShortUrl = async (url) => {
  const shortedCode = nanoid(5);
  const query = {
    _id: new mongoose.Types.ObjectId(),
    shortedCode,
    url,
  };
  const shortUrl = new Short(query);
  const created = await shortUrl.save();

  return created;
};
module.exports = createShortUrl;
