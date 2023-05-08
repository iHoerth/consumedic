const { Router } = require('express');
require('dotenv').config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

// Cloundinary Configuration 
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });

const router = Router();

// cloudinary uoload example
// cloudinary.uploader.upload("url_de_imagern").then(result=>console.log(result));


module.exports = router;