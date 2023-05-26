const { DoctorType } = require("../../db");

const deleteDoctor = async ({ id }) => {
  try {
    const doctor = await DoctorType.findOne({
      where: { id: id },
    });
    if (!doctor) {
      throw new Error(`No se encontró el doctor con el ID ${id}`);
    }

    await DoctorType.destroy({
      where: {
        id: id,
      },
    });
    return "Delete Succesfull";
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteDoctor };
