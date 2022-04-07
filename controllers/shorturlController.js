const Short = require("../models/Short");
const validator = require("validator");
const createShortUrl = require("../createShortUrl");

const get_root = async (req, res, next) => {
  const shortedCode = req.query.shortedCode;
  try {
    const shortUrl = await Short.findOne({ shortedCode: shortedCode });
    if (shortUrl) {
      return res.json(
        {
          shortUrl,
        },
        200
      );
    }
    res.json("Short URL is not found", 404);
  } catch (error) {}
};

const post_create = async (req, res, next) => {
  if (!validator.isURL(req.body.url)) {
    return res.status(400).send("Not a valid URL");
  }

  try {
    const exists = await Short.findOne({ url: req.body.url });
    if (exists) {
      return res.json({
        shortedCode: exists.shortedCode,
        url: exists.url,
      });
    }
    const shortUrl = await createShortUrl(req.body.url);
    res.json({
      shortedCode: shortUrl.shortedCode,
      url: shortUrl.url,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("URL is unavailable");
  }
};

module.exports = {
  get_root,
  post_create,
};
