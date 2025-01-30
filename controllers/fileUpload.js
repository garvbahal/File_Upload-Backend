const File = require("../models/fileModel");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File is here ->", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (error) => {
      if (error) {
        console.log(error);
      }
    });

    res.status(200).json({
      success: true,
      message: "Local File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

async function uploadFileToCloudinary(file, folder, width) {
  const options = { folder, resource_type: "auto" };
  if (width) {
    options.width = width;
    options.crop = "fill";
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();

    console.log(fileType);

    // max size 4 mb
    if (file.size > 4194304) {
      return res.status(400).json({
        success: false,
        message: "File Size too large",
      });
    }

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format",
      });
    }

    const response = await uploadFileToCloudinary(file, "Garv-Bahal");

    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // max size 4 mb
    if (file.size > 4194304) {
      return res.status(400).json({
        success: false,
        message: "File Size too large",
      });
    }

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid File format",
      });
    }

    const response = await uploadFileToCloudinary(file, "Garv-Bahal");

    const fileData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: false,
      imageUrl: response.secure_url,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    // max size 4 mb
    if (file.size > 4194304) {
      return res.status(400).json({
        success: false,
        message: "File Size too large",
      });
    }

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format",
      });
    }

    // use Height attribute
    const response = await uploadFileToCloudinary(file, "Garv-Bahal", 50);

    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
