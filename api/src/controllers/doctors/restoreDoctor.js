const { DoctorType } = require("../../db");

const restoreDoctor = async ({ id }) => {
  try {
    const doctor = await DoctorType.findOne({
      where: { id: id },
      paranoid: false,
    });
    if (!doctor) {
      throw new Error(`No existe el doctor con ID ${id}`);
    }
    await DoctorType.restore({
      where: {
        id: id,
      },
    });

    return "Doctor restored successfully";
  } catch (error) {
    throw error;
  }
};

module.exports = { restoreDoctor };
