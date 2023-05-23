const { PacienteType } = require("../../db");

const deletePatient = async ({ id }) => {
  try {
    await PacienteType.destroy({
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

module.exports = { deletePatient };
