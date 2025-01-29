const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware

fileSchema.post("save", async function (doc) {
  try {
    console.log("Doc-> ", doc);

    // Shift this configuration under config folder

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const email = doc.email;

    let info = await transporter.sendMail({
      from: `Garv`,
      to: email,
      subject: "New File Uploaded on cloudinary",
      html: `<h2>Hello jee</h2> <a href='${doc.imageUrl}'>File uploaded</a>`,
    });

    console.log("Info", info);
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("File", fileSchema);
