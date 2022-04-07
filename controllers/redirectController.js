const Short = require("../models/Short");

const get_id = async (req, res) => {
  const shortedCode = req.params.id;
  try {
    const shortUrl = await Short.findOne({
      shortedCode,
    });

    if (shortUrl) {
      const data = {
        url: shortUrl.url,
        shortedCode: shortUrl.shortedCode,
      };
      res.setHeader(
        "Content-Security-Policy",
        `script-src 'self' 'unsafe-inline'; connect-src 'self'; script-src-attr 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; default-src 'self'; block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;`
      );
      return res.render("redirect.ejs", data);
    }
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get_id };
