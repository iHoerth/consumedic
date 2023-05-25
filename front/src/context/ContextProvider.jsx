import { createContext, useState } from "react";
import axios from "axios";
import useLocalStorage from "../helpers/useLocalStorage";
import { useNavigate } from "react-router-dom";

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

export const Context = createContext([]);
export const UtilitiesContext = createContext([]);
export const LoadingContext = createContext([]);
export const FilterContext = createContext([]);
export const SessionContext = createContext([]);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  console.log(URL_DOCTORS);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useLocalStorage("loggedUser", {
    isDoctor: false,
    token: "",
    email: "",
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
    doctorOpinions: [],
    fetchDoctors: async () => {
      const response = await axios(URL_DOCTORS);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctors: [...data],
        filteredDoctors: [...data],
      }));
    },
    fetchDoctorById: async (id) => {
      const response = await axios(`${URL_DOCTORS}/${id}`);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: data,
      }));
    },
    fetchDoctorByEmail: async (email) => {
      const data = (await axios(`${URL_DOCTORS}?email=${email}`)).data;
      //console.log(data);
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...data },
      }));
      //console.log({ ...data });
      return { ...data };
    },
    cleanDetail: async () => {
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: {},
      }));
    },
    createDoctor: async (newDoctor) => {
      const response = await axios.post(`${URL_DOCTORS}`, newDoctor);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...data },
      }));
    },
    filterDoctors: async (newFilter) => {
      setDoctorsData((prevState) => ({
        ...prevState,
        filteredDoctors: [...newFilter],
      }));
    },
    loginDoctor: async (loginData) => {
      // try {
      const sessionData = (
        await axios.post(`${URL_DOCTORS}/loginDoctor`, loginData)
      ).data;
      const doctorData = await doctorsData.fetchDoctorByEmail(
        loginData.email,
        loginData.nombre,
        loginData.apellido
      );
      console.log(doctorData);
      setSession({
        ...sessionData,
        email: loginData.email,
        nombre: loginData.nombre,
        apellido: loginData.apellido,
      });
      console.log({ sessionData, doctorData });
      return { sessionData, doctorData };
      // } catch (error) {
      //   console.log(error.message, "TRY CATCH CONTEXT");
      // }
    },
    putDoctor: async (doctorNewDetails) => {
      console.log(doctorNewDetails);
      const data = await axios.put(`${URL_DOCTORS}/edit`, doctorNewDetails)
        .data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...data },
      }));
      return data;
    },
    fetchOpinions: async (id) => {
      const data = (await axios.get(`${URL_OPINIONS}/${id}`)).data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorOpinions: [...data],
      }));
    },
  });

  const [patientsData, setPatientsData] = useState({
    patients: [],
    patientDetail: {},
    filteredPatients: [],
    opinions: [],
    fetchPatients: async () => {
      try {
        const data = (await axios(URL_PATIENTS)).data;
        setPatientsData((prevState) => ({
          ...prevState,
          patients: [...prevState.patients, ...data],
        }));
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
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
        console.log(error);
      }
    },
    postAppointment: async (datosTurno) => {
      try {
        await axios.post(`${URL_TURNOS}`, datosTurno);
      } catch (error) {
        console.log(error);
      }
    },
    loginPatient: async (loginData) => {
      if (loginData.token) {
        console.log("** LOGIN DATA **", loginData);
        setSession({
          email: loginData.email,
          token: loginData.token,
          isDoctor: false,
        });

        axios
          .get(`${URL_PATIENTS}?email=${loginData.email}`)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              console.log("EN EL CATCH DEL GET BY EMAIL");

              patientsData
                .createPatient({
                  loggedFromGoogle: loginData.loggedFromGoogle,
                  email: loginData.email,
                  nombre: loginData.nombre,
                  apellido: loginData.apellido,
                })
                .then((newPatient) => {
                  return newPatient;
                })
                .catch((error) => {
                  console.log("Error al crear el nuevo paciente:", error);
                  // Manejar el error al crear el nuevo paciente
                });
            } else {
              console.log("Error en la solicitud GET:", error);
              // Manejar otros errores de solicitud
            }
          });
      } else {
        const sessionData = (
          await axios.post(`${URL_PATIENTS}/login`, loginData)
        ).data;
        console.log(loginData.email, `*** CONTEXT ***`);
        const patientData = await patientsData.fetchPatientByEmail(
          loginData.email,
          loginData.nombre,
          loginData.apellido
        );
        setSession({
          ...sessionData,
          email: loginData.email,
          nombre: loginData.nombre,
          apellido: loginData.apellido,
          token: loginData.tokenId,
        });
        console.log({ sessionData, patientData });
        return { sessionData, patientData };
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
      const opinionsData = (await axios(`${URL_OPINIONS}/paciente/${id}`)).data;
      setPatientsData((prevState) => ({
        ...prevState,
        opinions: [...opinionsData],
      }));
    },
  });

  const [utilities, setUtilities] = useState({
    socialSecurity: [],
    specialties: [],
    fetchUtilities: async () => {
      const socialSecurityData = (await axios(`${URL_SOCIALSECURITY}`)).data;
      const specialtiesData = (await axios(`${URL_SPECIALTIES}`)).data;
      setUtilities((prevState) => ({
        ...prevState,
        socialSecurity: [...socialSecurityData],
        specialties: [...specialtiesData],
      }));
    },
  });

  const [panelMedico, setPanelMedico] = useState({
    pacientes: [],
    pacienteHistorial: {},
    turnos: {},
    vista: 0,

    fetchPacientes: async (id) => {
      const pacientesData = (await axios(`${URL_PERFILMEDICO}/${id}/pacientes`))
        .data;
      setPanelMedico((prevState) => ({
        ...prevState,
        pacientes: [...pacientesData],
      }));
    },
    fetchPacienteHistorial: async (idMedico, idPaciente) => {
      const pacienteHistorialData = (
        await axios(`${URL_PERFILMEDICO}/${idMedico}/pacientes/${idPaciente}`)
      ).data;
      setPanelMedico((prevState) => ({
        ...prevState,
        pacienteHistorial: { ...pacienteHistorialData },
      }));
    },
    fetchTurnos: async (id) => {
      const turnosData = (await axios(`${URL_APPOINTMENTS}/doctor/${id}`)).data;
      setPanelMedico((prevState) => ({
        ...prevState,
        turnos: turnosData,
      }));
    },
    setVista: (vista) => {
      setPanelMedico((prevState) => ({
        ...prevState,
        vista: vista,
      }));
    },
    postDocumentosCita: async (
      idCita,
      files64,
      idMedico,
      idPaciente,
      titulo
    ) => {
      await axios.post(`${URL_PERFILMEDICO}/doctor/cita/documento`, {
        idCita,
        files64,
        idMedico,
        idPaciente,
        titulo,
      });
    },
    postRespuestaCita: async (idCita, respuesta) => {
      console.log(idCita, respuesta);
      await axios.post(`${URL_PERFILMEDICO}/doctor/cita/respuesta`, {
        idCita,
        respuesta,
      });
    },
  });

  const [appointment, setAppointment] = useState({
    appointmentId: 0,
    doctorId: 0,
    patientId: 0,
    fecha: "",
    hora: "",
    description: "",
    pagado: false,
    createAppointment: async () => {},

    fetchAppointmentById: async () => {},

    setPayedToTrue: async () => {},
  });

  const [panelPaciente, setPanelPaciente] = useState({
    informacion: [],

    fetchPatientData: async (id) => {
      const pacientesData = (await axios(`${URL_PERFILPACIENTE}/${id}/doctors`))
        .data;
      setPanelPaciente((prevState) => ({
        ...prevState,
        informacion: [...pacientesData],
      }));
    },
    postDocumentosCita: async (
      idCita,
      files64,
      idMedico,
      idPaciente,
      titulo
    ) => {
      await axios.post(`${URL_DOCUMENTOS}`, {
        idCita,
        files64,
        idMedico,
        idPaciente,
        titulo,
      });
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
