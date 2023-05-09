const express = require('express');
const router = express.Router();
const opinionsController = require('../controller/opinionsController');

router.get("/opinions", opinionsController.getOpinions);



router.get("/opinions", async ( req, res ) => { // Mauro
  try {
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


router.get("/payment", async ( req, res ) => { //mauro
  try {
      return res.status(200).json();      
  } catch (error) {
      return res.status(404).send(error.message);
  }
})
