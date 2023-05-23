const { PacienteType } = require("../../db");

const restorePatient = async ({ id }) => {
  try {
    // const [restoredRows] =
    await PacienteType.restore({
      where: {
        id: id,
      },
    });
    // if (restoredRows === 0) {
    // return "Patient not found or already restored";
    // }
    return "Patient restored successfully";
  } catch (error) {
    throw error;
  }
};

module.exports = { restorePatient };
