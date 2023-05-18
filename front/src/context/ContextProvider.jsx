import { createContext, useState } from 'react';
import axios from 'axios';
import useLocalStorage from '../helpers/useLocalStorage';

export const Context = createContext([]);
export const UtilitiesContext = createContext([]);
export const LoadingContext = createContext([]);
export const FilterContext = createContext([]);
export const SessionContext = createContext([]);

const URL_PATIENTS = `http://localhost:3001/patients`;
const URL_DOCTORS = `http://localhost:3001/doctors`;
const URL_SPECIALTIES = `http://localhost:3001/specialties`;
const URL_SOCIALSECURITY = `http://localhost:3001/socialSecurity`;

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useLocalStorage('loggedUser', {
    isDoctor: false,
    token: '',
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
      const postData = (await axios.post(`${URL_DOCTORS}/loginDoctor`, loginData)).data;
      return postData;
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
    loginPatient: async (loginData) => {
      try {
        const sessionData = (await axios.post(`${URL_PATIENTS}/login`, loginData)).data;
        console.log(loginData.email)
        const patientData = await patientsData.fetchPatientByEmail(loginData.email);
        setSession(sessionData);
        console.log({ sessionData, patientData });
        return { sessionData, patientData };
      } catch (error) {
        console.log(error);
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

  return (
    <>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <UtilitiesContext.Provider value={utilities}>
          <FilterContext.Provider value={[selectedFilters, setSelectedFilters]}>
            <Context.Provider value={[doctorsData, patientsData, { session, setSession }]}>
              {children}
            </Context.Provider>
          </FilterContext.Provider>
        </UtilitiesContext.Provider>
      </LoadingContext.Provider>
    </>
  );
};

export default ContextProvider;
