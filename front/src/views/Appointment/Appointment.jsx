// import React from 'react'

// const Appointment = () => {
//   return (
//     <div>Appointment</div>
//   )
// }

// export default Appointment

import React, { useState } from 'react';

const Appointment = () => {
  // Estado para almacenar el nombre del paciente
  const [patientName, setPatientName] = useState('');

  // Estado para almacenar la fecha y hora de la cita
  const [appointmentDateTime, setAppointmentDateTime] = useState('');

  // Función para enviar la información de la cita al servidor
  const submitAppointment = () => {
    // Código para enviar la información al servidor
    console.log('Información de la cita enviada al servidor');
  };

  return (
    <div>
      <h2>Solicitud de cita</h2>
      <form>
        <label>
          Nombre del paciente:
          <input
            type="text"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Fecha y hora de la cita:
          <input
            type="datetime-local"
            value={appointmentDateTime}
            onChange={(event) => setAppointmentDateTime(event.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={submitAppointment}>
          Solicitar cita
        </button>
      </form>
    </div>
  );
};

export default Appointment;


