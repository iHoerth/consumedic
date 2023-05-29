const { PacienteType } = require("../../db");

const deletePatient = async ({ id }) => {
  try {
    const patient = await PacienteType.findOne({
      where: { id: id },
    });
    if (!patient) {
      throw new Error(`No se encontró paciente con el ID ${id}`);
    }
    await PacienteType.destroy({
      where: {
        id: id,
      },
    });
    return "Delete Succesfull";
  } catch (error) {
    throw error;
  }
};

module.exports = { deletePatient };
