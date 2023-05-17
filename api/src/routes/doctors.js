const { Router } = require("express");
const { loginDoctor } = require("../handlers/auth");

const {
  getDoctors,
  getDoctorsById,
  postDoctor,
  putDoctor,
} = require("../handlers/doctors");

const doctorsRouter = Router();

// GET
doctorsRouter.get("/", getDoctors); // tener en cuenta el query by ?name=....
doctorsRouter.get("/:id", getDoctorsById);

// POST
doctorsRouter.post("/", postDoctor);
doctorsRouter.post("/loginDoctor", loginDoctor);
//PUT
doctorsRouter.put("/", putDoctor);

module.exports = doctorsRouter;
