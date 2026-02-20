const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const PORT = 5000;
const app = express();

/**
 * 1. Configure cloudinary
 *    > We can save images or videos into MongoDB, but this is not recommended
 *      because MongoDB is not made for hoisting images or videos.
 *    > If we do this, it might not perform well in terms of performance and
 *      pricing.
 *    > We will use Cloudinary Service Provider to store images or videos.
 *    > Install: npm i cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * 2. Configure multer storage cloudinary
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "file-uploads",
    format: async (req, file) => "png", //convert all images to png
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
 * 3. Configure multer
 *    > By default, express doesn't support file upload, so we install
 *      external packages to handle file upload.
 *    > Install: npm i multer
 */
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1020 * 5, //5MB Limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images", false));
    }
  },
});

/**
 * 4. Start the server
 */
app.listen(
  PORT,
  console.log(`Server is up and running on the port ${PORT}...`)
);
