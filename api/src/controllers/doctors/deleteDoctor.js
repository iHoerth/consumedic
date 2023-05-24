const { DoctorType } = require("../../db");

const deleteDoctor = async ({ id }) => {
  try {
    await DoctorType.destroy({
      where: {
        id: id,
      },
    });
    return "Delete Succesfull";
  } catch (error) {
    throw error;
    // res.status(400).send(error);
  }
};

module.exports = { deleteDoctor };
