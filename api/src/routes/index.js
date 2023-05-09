const { Router } = require('express');
const {ObraSocial} = require('../db');
require('dotenv').config();


// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
// const cloudinary = require("cloudinary").v2;

// // Cloundinary Configuration 
// cloudinary.config({
//     cloud_name: CLOUDINARY_CLOUD_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
//     secure: true
//   });

const router = Router();


router.get("/doctors", async ( req, res ) => {  // Facu
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/obrasSociales", async ( req, res ) => { // Bruno
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/opinions", async ( req, res ) => { // Mauro
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/pacient", async ( req, res ) => { //Rolando
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/specialties", async ( req, res ) => { //Facu
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/doctors/:id", async ( req, res ) => { //brunio
  try {
    const {id} = req.params;
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})



router.post("/newUser", async ( req, res ) => { //Mauro
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/login", async ( req, res ) => { // rolando
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/clinicHistory/:idPacient", async ( req, res ) => { //Facu
  try {
    const {idPacient} = req.params;
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.post("/opinions", async ( req, res ) => { //bruno
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})

router.get("/payment", async ( req, res ) => { //mauro
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})












module.exports = router;