import { createContext, useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../helpers/useLocalStorage';

import {
  URL_PATIENTS,
  URL_DOCTORS,
  URL_SPECIALTIES,
  URL_SOCIALSECURITY,
  URL_PERFILMEDICO,
  URL_TURNOS,
  URL_PERFILPACIENTE,
} from '../helpers/urlVariables';


export const Context = createContext([]);
export const UtilitiesContext = createContext([]);
export const LoadingContext = createContext([]);
export const FilterContext = createContext([]);
export const SessionContext = createContext([]);


const ContextProvider = ({ children }) => {
  console.log(URL_DOCTORS);
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
      try {
        const sessionData = (await axios.post(`${URL_DOCTORS}/loginDoctor`, loginData)).data;
        const doctorData = await doctorsData.fetchDoctorByEmail(loginData.email);
        console.log(doctorData);
        setSession({ ...sessionData, email: loginData.email });
        console.log({ sessionData, doctorData });
        return { sessionData, doctorData };
      } catch (error) {
        console.log(error.message, 'TRY CATCH CONTEXT');
      }
    },
    putDoctor: async (doctorNewDetails) => {
      console.log(doctorNewDetails);
      const data = await axios.put(`${URL_DOCTORS}/edit`, doctorNewDetails).data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...data },
      }));
    },
  });

  const [patientsData, setPatientsData] = useState({
    patients: [],
    patientDetail: {},
    filteredPatients: [],
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
      console.log(loginData);
      try {
        const sessionData = (await axios.post(`${URL_PATIENTS}/login`, loginData)).data;
        console.log(loginData.email, `*** CONTEXT ***`);
        const patientData = await patientsData.fetchPatientByEmail(loginData.email);
        setSession({ ...sessionData, email: loginData.email });
        console.log({ sessionData, patientData });
        return { sessionData, patientData };
      } catch (error) {
        console.log(error, 'TRY CATCH CONTEXT');
      }
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
    turnos: [],
    vista: 0,

    fetchPacientes: async (id) => {
      const pacientesData = (await axios(`${URL_PERFILMEDICO}/${id}/pacientes`)).data;
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
      const turnosData = (await axios(`${URL_TURNOS}/doctor/${id}`)).data;
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
      console.log(idCita, respuesta);
      await axios.post(`${URL_PERFILMEDICO}/doctor/cita/respuesta`, { idCita, respuesta });
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
  });

  const [panelPaciente, setPanelPaciente] = useState({
    informacion: [],

    fetchPatientData: async (id) => {
      const pacientesData = (await axios(`${URL_PERFILPACIENTE}/${id}/doctors`)).data;
      setPanelPaciente((prevState) => ({
        ...prevState,
        informacion: [...pacientesData],
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
                doctorsData,
                patientsData,
                { session, setSession },
                panelMedico,
                appointment,
                panelPaciente,
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
