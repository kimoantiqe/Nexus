const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const dbConfig = require("../configurations/db.js");
const dbURL = process.env.NODE_ENV === "test" ? dbConfig.testurl : dbConfig.url;
const storage = require("multer-gridfs-storage")({
  url: dbURL,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    return {
      filename:
        file.originalname.substring(0, file.originalname.lastIndexOf(".")) +
        Date.now() +
        file.originalname.substring(file.originalname.lastIndexOf(".")),
      metadata: req.body,
      bucketName: "image"
    };
  }
});

const upload = multer({
  //multer settings for single upload
  storage
}).single("file");

module.exports = upload;
