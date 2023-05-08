const { Router } = require('express');
const {ObraSocial} = require('../db');
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


router.post("/obrasocial", async ( req, res ) => {
  try {
      const nuevaObraSocial = await ObraSocial.create({
        nombre: "OSDE"
      }) 
      
      return res.status(200).json(nuevaObraSocial);      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

// cloudinary uoload example
// cloudinary.uploader.upload("url_de_imagern").then(result=>console.log(result));





module.exports = router;