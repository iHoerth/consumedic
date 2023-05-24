const { Router } = require("express");
const { loginDoctor } = require("../handlers/auth");

const {
  getDoctors,
  getDoctorsById,
  postDoctor,
  putDoctor,
  putDoctorEdit,
  getSoftDeletedDoctors,
  restoreDoctors,
  deleteDoctors,
} = require("../handlers/doctors");

const doctorsRouter = Router();

// GET
doctorsRouter.get("/", getDoctors); // tener en cuenta el query by ?name=....
doctorsRouter.get("/softDeleted", getSoftDeletedDoctors);
doctorsRouter.get("/:id", getDoctorsById);

// POST
doctorsRouter.post("/", postDoctor);
doctorsRouter.post("/loginDoctor", loginDoctor);
//PUT
doctorsRouter.put("/", putDoctor);
doctorsRouter.put("/edit", putDoctorEdit);
doctorsRouter.put("/restore/:id", restoreDoctors);

//DELETE
doctorsRouter.delete("/:id", deleteDoctors);

module.exports = doctorsRouter;
