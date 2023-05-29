const { PacienteType } = require("../../db");

const restorePatient = async ({ id }) => {
  try {
    const patient = await PacienteType.findOne({
      where: { id: id },
      paranoid: false,
    });
    if (!patient) {
      throw new Error(`No existe el paciente con ID ${id}`);
    }
    await PacienteType.restore({
      where: {
        id: id,
      },
    });
    return "Patient restored successfully";
  } catch (error) {
    throw error;
  }
};

module.exports = { restorePatient };
