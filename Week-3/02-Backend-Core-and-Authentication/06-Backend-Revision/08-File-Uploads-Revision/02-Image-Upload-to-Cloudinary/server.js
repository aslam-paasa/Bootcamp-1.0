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
  .connect("mongodb://localhost:27017/image-upload")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

/**
 * 2. Create Image schema and model
 */
const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

/**
 * 3. Configure cloudinary
 */
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * 4. Configure multer storage cloudinary
 *    > Parameters:
 *      a. cloudinary: it is the instance of cloudinary
 *      b. params: it is the parameters for the storage
 *         - folder: location where the image will be stored
 *         - format: format of the image
 *         - public_id: unique identifier for the image
 *         - transformation: transformation of the image:
 *           > width: width of the image
 *           > height: height of the image
 *           > crop: crop type
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 800,
        height: 600,
        crop: "fill",
      },
    ],
  },
});

/**
 * 5. Configure Multer
 *    > Parameters:
 *      a. storage: it is the storage for the image
 *      b. limits: it will limit the size of the image
 *      c. fileFilter: it will filter the image based on the mime type
 *         - mime type: image/png, image/jpeg, image/jpg, image/webp)
 *         - cb(null, true): it means the image is valid, we can upload it
 *         - cb(new Error("Not an image! Please upload an image", false)): 
 *           it means the image is not valid, we can't upload it
 */
const upload = multer({
  storage,
  limits: 1024 * 1020 * 5, //5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image", false));
    }
  },
});

/**
 * 6. Welcome route:
 *    > GET /
 *    > Response: { message: "Welcome to image upload API" }
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to image upload API" });
});

/**
 * 7. Upload form route:
 *    > GET /upload-form
 *    > Response: { message: "Please use a POST request to /upload to upload files" }
 */
app.get("/upload-form", (req, res) => {
  res.json({ message: "Please use a POST request to /upload to upload files" });
});

/**
 * 8. Upload route:
 *    > POST /upload
 *    > upload.single("file"): it will upload the single image
 *    > upload.array("files"): it will upload the multiple images
 *    > Request: { file: <image> }
 *    > Response: { success: true, data: uploaded }
 *    > Cloudinary will create a url and public_id for the image and save 
 *      the image url and public_id to the database using the Image 
 *      model/schema.
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const uploaded = await Image.create({
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
 * 9. Get all images route:
 *    > GET /images
 *    > Response: { success: true, data: files }
 */
app.get("/images", async (req, res) => {
  try {
    const files = await Image.find();
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
 *    > Listen on port 5000
 *    > Log server is up and running
 */
app.listen(PORT, console.log(`Server is up and running ${PORT}..`));
