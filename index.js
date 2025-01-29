const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const dbConnect = require("./config/database");
dbConnect();

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
  console.log(`App is started at ${PORT}`);
});
