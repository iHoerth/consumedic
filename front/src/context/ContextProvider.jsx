import { createContext, useState } from 'react';
import axios from 'axios';

export const Context = createContext([]);

const URL_PATIENTS = `http://localhost:3001/patients`;
const URL_DOCTORS = `http://localhost:3001/doctors`;

const ContextProvider = ({ children }) => {
  const [doctorsData, setDoctorsData] = useState({
    doctors: [],
    doctorDetail: {},
    filteredDoctors: [],
    fetchDoctors: async () => {
      const response = await axios(URL_DOCTORS);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctors: [...prevState.doctors, ...data],
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
      const response = await axios(`${URL_DOCTORS}/${email}`);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: data,
      }));
    },
    cleanDetail: async () => {
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: {}
      }))
    },
    createDoctor: async (newDoctor) => {
      const response = await axios.post(`${URL_DOCTORS}`, newDoctor);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: { ...data },
      }))
    },
  });

  const [patientsData, setPatientsData] = useState({
    patients: [],
    patientDetail: {},
    filteredPatients: [],
    fetchPatients: async () => {
      const response = await axios(URL_PATIENTS);
      const data = await response.data;
      setPatientsData((prevState) => ({
        ...prevState,
        patients: [...prevState.patients, ...data],
      }));
    },
    fetchPatientByEmail: async (email) => {
      const response = await axios(`${URL_PATIENTS}?email=${email}`);
      const data = await response.data;
      setPatientsData((prevState) => ({
        ...prevState,
        patientDetail: { ...data },
      }));
    },
    createPatient: async (newPatient) => {
      const response = await axios.post(`${URL_PATIENTS}`, newPatient);
      const data = await response.data;
      setPatientsData((prevState) => ({
        ...prevState,
        patientDetail: { ...data },
      }))
    },
  });

  return (
    <>
      <Context.Provider value={[doctorsData, patientsData]}>{children}</Context.Provider>
    </>
  );
};

export default ContextProvider;
