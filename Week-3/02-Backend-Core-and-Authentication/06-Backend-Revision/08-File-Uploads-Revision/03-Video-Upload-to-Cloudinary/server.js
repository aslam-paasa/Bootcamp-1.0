require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const PORT = 5000;
const app = express();

/**
 * 1. Connect to mongodb
 */
mongoose
  .connect("mongodb://localhost:27017/video-upload")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

/**
 * 2. Create Video schema and model
 */
const videosSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videosSchema);

/**
 * 3. Configure cloudinary
 */
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * 4. Configure milter storage cloudinary
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "video-demo";
    let resource_type = "auto";
    return {
      folder,
      resource_type,
      public_id: file.fieldname + "_" + Date.now(),
    };
  },
});

/**
 * 5. Configure Multer
 */
const upload = multer({
  storage,
});

/**
 * 6. Welcome route
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to video upload API" });
});

/**
 * 7. Route for displaying upload form
 */
app.get("/upload-form", (req, res) => {
  res.json({ message: "Please use a POST request to /upload to upload files" });
});

/**
 * 8. Upload route
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const uploaded = await Video.create({
    url: req.file.path,
    public_id: req.file.filename,
  });
  //send response
  res.status(201).json({
    success: true,
    data: uploaded
  });
});

/**
 * 9. Get all videos route
 */
app.get("/videos", async (req, res) => {
  try {
    const files = await Video.find();
    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 10. Start the server
 */
app.listen(PORT, console.log(`Server is up and running ${PORT}..`));
