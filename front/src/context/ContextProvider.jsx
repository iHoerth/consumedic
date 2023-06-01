import { createContext, useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../helpers/useLocalStorage';
import { useNavigate } from 'react-router-dom';

// import {
//   URL_PATIENTS,
//   URL_DOCTORS,
//   URL_SPECIALTIES,
//   URL_SOCIALSECURITY,
//   URL_PERFILMEDICO,
//   URL_TURNOS,
//   URL_PERFILPACIENTE,
// } from '../helpers/urlVariables';

const URL_PATIENTS = process.env.REACT_APP_URL_PATIENTS;
const URL_DOCTORS = process.env.REACT_APP_URL_DOCTORS;
const URL_SPECIALTIES = process.env.REACT_APP_URL_SPECIALTIES;
const URL_SOCIALSECURITY = process.env.REACT_APP_URL_SOCIALSECURITY;
const URL_PERFILMEDICO = process.env.REACT_APP_URL_PERFILMEDICO;
const URL_MAIL = process.env.REACT_APP_URL_MAIL;
const URL_POSTAGENDA = process.env.REACT_APP_URL_POSTAGENDA;
const URL_TURNOS = process.env.REACT_APP_URL_TURNOS;
const URL_APPOINTMENTS = process.env.REACT_APP_URL_APPOINTMENTS;
const URL_PERFILPACIENTE = process.env.REACT_APP_URL_PERFILPACIENTE;
const URL_DOCUMENTOS = process.env.REACT_APP_URL_DOCUMENTOS;
const URL_OPINIONS = process.env.REACT_APP_URL_OPINIONS;
const URL_ADMIN = process.env.REACT_APP_URL_ADMIN;

export const Context = createContext([]);
export const UtilitiesContext = createContext([]);
export const LoadingContext = createContext([]);
export const FilterContext = createContext([]);
export const SessionContext = createContext([]);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useLocalStorage('loggedUser', {
    isDoctor: false,
    token: '',
    email: '',
  }); //user es tanto paciente como doctor.

  const [selectedFilters, setSelectedFilters] = useState({
    Especialidads: [false, {}],
    ObraSocials: [false, {}],
    Cita: [false, {}],
    location: [false, {}],
  });

  const [doctorsData, setDoctorsData] = useState({
    doctors: [],
    doctorDetail: {},
    filteredDoctors: [],
    deletedDoctor: [],
    doctorOpinions: [],
    snackOk: false,
    snackOkMensaje: '',
    snackFail: false,
    snackFailMensaje: '',
    fetchDoctors: async () => {
      try {
        const response = await axios(URL_DOCTORS);
        const data = await response.data;
        setDoctorsData((prevState) => ({
          ...prevState,
          doctors: [...data],
          filteredDoctors: [...data],
        }));
      } catch (error) {
        console.log(error);
      }
    },
    fetchDoctorById: async (id) => {
      try {
        const response = await axios(`${URL_DOCTORS}/${id}`);
        const data = await response.data;
        setDoctorsData((prevState) => ({
          ...prevState,
          doctorDetail: data,
        }));
        return data;
      } catch (error) {
        throw error
      }
    },

    fetchDoctorByEmail: async (email) => {
      try {
        const data = (await axios(`${URL_DOCTORS}?email=${email}`)).data;
        setDoctorsData((prevState) => ({
          ...prevState,
          doctorDetail: { ...data },
        }));
        return { ...data };
      } catch (error) {
        console.log(error);
      }
    },

    fetchSoftDeletedDoctor: async () => {
      try {
        const data = (await axios(`${URL_DOCTORS}/softDeleted`)).data;
        setDoctorsData((prevState) => ({
          ...prevState,
          deletedDoctor: [...data],
        }));
      } catch (error) {
        console.log(error);
      }
    },

    deleteDoctor: async (id) => {
      try {
        await axios.delete(`${URL_DOCTORS}/${id}`);
      } catch (error) {
        console.log(error);
      }
    },

    restoreDoctor: async (id) => {
      try {
        await axios.put(`${URL_DOCTORS}/restore/${id}`);
      } catch (error) {
        console.log(error);
      }
    },

    cleanDetail: async () => {
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: {},
      }));
    },

    createDoctor: async (newDoctor) => {
      try {
        const data = (await axios.post(`${URL_DOCTORS}`, newDoctor)).data;
        const response = (await axios(`${URL_DOCTORS}/${data.id}`)).data;
    
        setDoctorsData((prevState) => ({
          ...prevState,
          doctorDetail: { ...response },
          snackOk: true,
          snackOkMensaje: 'Perfil de Doctor Creado con Exito',
        }));
        return response;
        
      } catch (error) {
        setDoctorsData((prevState) => ({
          ...prevState,
          snackFail: true,
          snackFailMensaje: error.response.data.message,
        }));
        throw error;
      }
    },
    filterDoctors: async (newFilter) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        filteredDoctors: [...newFilter],
      }));
    },
    loginDoctor: async (loginData) => {
      if(session.email) return;
      if (loginData.token) {
        setSession({
          email: loginData.email,
          token: loginData.token,
          isDoctor: true,
        });

        try {
          const result = await axios.get(`${URL_DOCTORS}?email=${loginData.email}`);
          console.log(result);
          return result;
        } catch (error) {
          if (error.response && error.response.status === 400) {
            try {
              const newDoctor = await doctorsData.createDoctor({
                loggedFromGoogle: loginData.loggedFromGoogle,
                email: loginData.email,
                nombre: loginData.nombre,
                apellido: loginData.apellido,
              });
              return newDoctor;
            } catch (error) {
              throw error;
            }
          } else {
            throw error;
          }
        }
      } else {
        try {
          console.log(loginData);
          const sessionData = (await axios.post(`${URL_DOCTORS}/loginDoctor`, loginData)).data;
          console.log(sessionData);
          const doctorData = await doctorsData.fetchDoctorByEmail(loginData.email);
          console.log(doctorData);
          setSession({
            ...sessionData,
            email: loginData.email,
            nombre: loginData.nombre,
            apellido: loginData.apellido,
          });
          console.log({ sessionData, doctorData });
          return { sessionData, doctorData };
        } catch (error) {
          setDoctorsData((prevState) => ({
            ...prevState,
            snackFail: true,
            snackFailMensaje: 'No se encuentra usuario con ese email y/o contraseña',
          }));
          throw error;
        }
      }
    },
    putDoctor: async (doctorNewDetails) => {
      try {
        const data = await axios.put(`${URL_DOCTORS}/edit`, doctorNewDetails).data;
        setDoctorsData((prevState) => ({
          ...prevState,
          doctorDetail: { ...data },
        }));
        return data;
      } catch (error) {
        throw error
      }
    },
    fetchOpinions: async (id) => {
      try {
        const data = (await axios.get(`${URL_OPINIONS}/${id}`)).data;
        setDoctorsData((prevState) => ({
          ...prevState,
          doctorOpinions: [...data],
        }));
      } catch (error) {
        console.log(error.message);
      }
    },
    setSnackOk: (dato) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        snackOk: dato,
      }));
    },
    setSnackOkMensaje: (dato) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        snackOkMensaje: dato,
      }));
    },
    setSnackFail: (dato) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        snackFail: dato,
      }));
    },
    setSnackFailMensaje: (dato) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        snackFailMensaje: dato,
      }));
    },
    setDoctor: (doctor) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...doctor },
      }));
    },
  });

  const [patientsData, setPatientsData] = useState({
    patients: [],
    patientDetail: {},
    filteredPatients: [],
    deletedPatient: [],
    opinions: [],
    snackOk: false,
    snackOkMensaje: '',
    snackFail: false,
    snackFailMensaje: '',
    fetchPatients: async () => {
      try {
        const data = (await axios(URL_PATIENTS)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          patients: [...data],
        }));
      } catch (error) {
        console.log(error.message);
      }
    },
    fetchPatientByEmail: async (email) => {
      try {
        const data = (await axios(`${URL_PATIENTS}?email=${email}`)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          patientDetail: { ...data },
        }));
        return { ...data };
      } catch (error) {
        console.log(error.message);
      }
    },
    fetchPatientById: async (id) => {
      try {
        const data = (await axios(`${URL_PATIENTS}/${id}`)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          patientDetail: { ...data },
        }));
        return { ...data };
      } catch (error) {
        console.log(error.message);
      }
    },
    fetchSoftDeletedPatient: async () => {
      try {
        const data = (await axios(`${URL_PATIENTS}/softDeleted`)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          deletedPatient: [...data],
        }));
      } catch (error) {
        console.log(error);
      }
    },
    deletePatient: async (id) => {
      try {
        await axios.delete(`${URL_PATIENTS}/${id}`);
      } catch (error) {
        console.log(error);
      }
    },

    restorePatient: async (id) => {
      try {
        await axios.put(`${URL_PATIENTS}/restore/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    cleanDetailPaciente: async () => {
      setPatientsData((prevState) => ({
        ...prevState,
        patientDetail: {},
      }));
    },
    createPatient: async (newPatient) => {
      try {
        const data = (await axios.post(`${URL_PATIENTS}`, newPatient)).data;

        setPatientsData((prevState) => ({
          ...prevState,
          patientDetail: { ...data },
        }));
        return data;
      } catch (error) {
        setPatientsData((prevState) => ({
          ...prevState,
          snackFail: true,
          snackFailMensaje: error.response.data.message,
        }));
        throw error
      }
    },

    setSnackOk: (boolean) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        snackOk: boolean,
      }));
    },
    setSnackOkMensaje: (msg) => {
      setPatientsData((prevState) => ({
        ...prevState,
        snackOkMensaje: msg,
      }));
    },
    setSnackFail: (boolean) => {
      setPatientsData((prevState) => ({
        ...prevState,
        snackFail: boolean,
      }));
    },
    setSnackFailMensaje: (msg) => {
      setPatientsData((prevState) => ({
        ...prevState,
        snackFailMensaje: msg,
      }));
    },

    postAppointment: async (datosTurno) => {
      try {
        await axios.post(`${URL_APPOINTMENTS}`, datosTurno);
      } catch (error) {
        console.log(error);
      }
    },
    loginPatient: async (loginData) => {
      if (loginData.token) {
        setSession({
          email: loginData.email,
          token: loginData.token,
          isDoctor: false,
        });

        try {
          const result = await axios.get(`${URL_PATIENTS}?email=${loginData.email}`);
          return result;
        } catch (error) {
          if (error.response && error.response.status === 400) {
            try {
              const newPatient = await patientsData.createPatient({
                loggedFromGoogle: loginData.loggedFromGoogle,
                email: loginData.email,
                nombre: loginData.nombre,
                apellido: loginData.apellido,
              });
              return newPatient;
            } catch (error) {
              throw error;
            }
          } else {
            throw error;
          }
        }
      } else {
        try {
          const sessionData = (await axios.post(`${URL_PATIENTS}/login`, loginData)).data;
          const patientData = await patientsData.fetchPatientByEmail(loginData.email);
          setSession({
            ...sessionData,
            email: loginData.email,
            nombre: loginData.nombre,
            apellido: loginData.apellido,
          });
          console.log({ sessionData, patientData });
          return { sessionData, patientData };
        } catch (error) {
          setPatientsData((prevState) => ({
            ...prevState,
            snackFail: true,
            snackFailMensaje: 'No se encuentra usuario con ese email y/o contraseña',
          }));
          throw error;
        }
      }
    },

    modifyPatientProfiler: async (patientData) => {
      try {
        await axios.put(`${URL_PATIENTS}/profile`, patientData).data;
        const data = (await axios(`${URL_PATIENTS}?email=${patientData.email}`)).data;

        setPatientsData((prevState) => ({
          ...prevState,
          patientDetail: { ...data },
        }));
      } catch (error) {
        throw error
      }
    },

    postOpinions: async (newOpinion) => {
      try {
        const data = (await axios.post(`${URL_OPINIONS}`, newOpinion)).data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getOpinionsByPaciente: async (id) => {
      try {
        const opinionsData = (await axios(`${URL_OPINIONS}/paciente/${id}`)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          opinions: [...opinionsData],
        }));
      } catch (error) {
        console.log(error);
      }
    },
    setPaciente: (paciente) => {
      setPatientsData((prevState) => ({
        ...prevState,
        patientDetail: { ...paciente },
      }));
    },
  });

  const [utilities, setUtilities] = useState({
    socialSecurity: [],
    specialties: [],
    fetchUtilities: async () => {
      try {
        const socialSecurityData = (await axios(`${URL_SOCIALSECURITY}`)).data;
        const specialtiesData = (await axios(`${URL_SPECIALTIES}`)).data;
        setUtilities((prevState) => ({
          ...prevState,
          socialSecurity: [...socialSecurityData],
          specialties: [...specialtiesData],
        }));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [panelMedico, setPanelMedico] = useState({
    pacientes: [],
    pacienteHistorial: {},
    turnos: {},
    vista: 0,

    fetchPacientes: async (id) => {
      try {
        const pacientesData = (await axios(`${URL_PERFILMEDICO}/${id}/pacientes`)).data;
        setPanelMedico((prevState) => ({
          ...prevState,
          pacientes: [...pacientesData],
        }));
      } catch (error) {
        console.log(error.message);
      }
    },
    fetchPacienteHistorial: async (idMedico, idPaciente) => {
      try {
        const pacienteHistorialData = (
          await axios(`${URL_PERFILMEDICO}/${idMedico}/pacientes/${idPaciente}`)
        ).data;
        setPanelMedico((prevState) => ({
          ...prevState,
          pacienteHistorial: { ...pacienteHistorialData },
        }));
      } catch (error) {
        console.log(error);
      }
    },
    fetchTurnos: async (id) => {
      try {
        const turnosData = (await axios(`${URL_APPOINTMENTS}/doctor/${id}`)).data;
        setPanelMedico((prevState) => ({
          ...prevState,
          turnos: turnosData,
        }));
      } catch (error) {
        console.log(error.message);
      }
    },
    setVista: (vista) => {
      setPanelMedico((prevState) => ({
        ...prevState,
        vista: vista,
      }));
    },
    postDocumentosCita: async (idCita, files64, idMedico, idPaciente, titulo) => {
      await axios.post(`${URL_PERFILMEDICO}/doctor/cita/documento`, {
        idCita,
        files64,
        idMedico,
        idPaciente,
        titulo,
      });
    },
    postRespuestaCita: async (idCita, respuesta) => {
      try {
        await axios.post(`${URL_PERFILMEDICO}/doctor/cita/respuesta`, {
          idCita,
          respuesta,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [appointment, setAppointment] = useState({
    appointmentId: 0,
    doctorId: 0,
    patientId: 0,
    fecha: '',
    hora: '',
    description: '',
    pagado: false,
    createAppointment: async () => {},

    fetchAppointmentById: async () => {},

    setPayedToTrue: async () => {},

    deleteAppointmentById: async (id) => {
      try {
        const response = await axios.delete(`${URL_APPOINTMENTS}/${id}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [panelPaciente, setPanelPaciente] = useState({
    informacion: [],

    fetchPatientData: async (id) => {
      try {
        const pacientesData = (await axios(`${URL_PERFILPACIENTE}/${id}/doctors`)).data;

        setPanelPaciente((prevState) => ({
          ...prevState,
          informacion: [...pacientesData],
        }));
      } catch (error) {
        console.log(error);
      }
    },
    postDocumentosCita: async (idCita, files64, idMedico, idPaciente, titulo) => {
      try {
        await axios.post(`${URL_DOCUMENTOS}`, {
          idCita,
          files64,
          idMedico,
          idPaciente,
          titulo,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [panelAdmin, setPanelAdmin] = useState({
    admin: {},
    vista: 0,
    pacientes: [],
    medicos: [],
    email: 0,
    setVista: (vista) => {
      setPanelAdmin((prevState) => ({
        ...prevState,
        vista: vista,
      }));
    },
    setEmail: (email) => {
      setPanelAdmin((prevState) => ({
        ...prevState,
        email: email,
      }));
    },
    setAdmin: async (id) => {
      try {
        await axios.put(`${URL_ADMIN}/newAdmin`, { id });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [mailer, setMailer] = useState({
    mailDoctor: '',
    mailPaciente: '',
    modal: false,
    snackOk: false,
    snackOkMensaje: '',
    snackFail: false,
    snackFailMensaje: '',
    setMailDoctor: (dato) => {
      setMailer((prevState) => ({
        ...prevState,
        mailDoctor: dato,
      }));
    },
    setMailPaciente: (dato) => {
      setMailer((prevState) => ({
        ...prevState,
        mailPaciente: dato,
      }));
    },
    setModal: (dato) => {
      setMailer((prevState) => ({
        ...prevState,
        modal: dato,
      }));
    },
    setSnackOk: (boolean) => {
      setMailer((prevState) => ({
        ...prevState,
        snackOk: boolean,
      }));
    },
    setSnackOkMensaje: (msg) => {
      setMailer((prevState) => ({
        ...prevState,
        snackOkMensaje: msg,
      }));
    },
    setSnackFail: (boolean) => {
      setMailer((prevState) => ({
        ...prevState,
        snackFail: boolean,
      }));
    },
    setSnackFailMensaje: (msg) => {
      setMailer((prevState) => ({
        ...prevState,
        snackFailMensaje: msg,
      }));
    },
  });

  return (
    <>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <UtilitiesContext.Provider value={utilities}>
          <FilterContext.Provider value={[selectedFilters, setSelectedFilters]}>
            <Context.Provider
              value={[
                doctorsData, //[0]
                patientsData, //[1]
                { session, setSession }, //[2]
                panelMedico, //[3]
                appointment, //[4]
                panelPaciente, //[5]
                panelAdmin, // [6]
                mailer, //[7]
              ]}
            >
              {children}
            </Context.Provider>
          </FilterContext.Provider>
        </UtilitiesContext.Provider>
      </LoadingContext.Provider>
    </>
  );
};

export default ContextProvider;
