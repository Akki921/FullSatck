const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path/posix");
const fs = require("file-system");
const Os = require("os");
const cors = require("cors");
app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    let pathimage = path.join(
      "C:/xampp/htdocs/fullStack/frontend/public/",
      "uploads"
    );
    if (!fs.existsSync(pathimage)) {
      fs.mkdirSync(pathimage, { recursive: true });
    }
    cb(null, pathimage);
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Date.now() / 100000) + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

var multiple = upload.fields([{ name: "img1" }]);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/single", multiple, (req, res) => {
  console.log(req.file);
  res.send("single file upload succecsfuly");
});
app.listen(5000);
