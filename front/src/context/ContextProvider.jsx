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
        doctorDetail: data
      }))
    },
    fetchDoctorByEmail: async (email) => {
      const response = await axios(`${URL_DOCTORS}/${email}`);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctorDetail: data
      }))
    },
    createDoctor: async () => {},
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
      const response = await axios(`${URL_PATIENTS}?email=${email}`)
      const data = await response.data;
      setPatientsData((prevState) => ({
        ...prevState,
        patientDetail: {...data}
      }))
    },
    createUser: async () => {},
  });

  return (
    <>
      <Context.Provider value={[ doctorsData, patientsData ]}>
        {children}
      </Context.Provider>
    </>
  );
};

export default ContextProvider;
