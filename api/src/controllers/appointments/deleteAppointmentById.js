const { Cita } = require("../../db");

const deleteAppointmentById = async (id) => {
  try {
    await Cita.destroy({
      where: {
        id: id,
      },
    });
    return "Eliminado exitosamente!";
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteAppointmentById };
