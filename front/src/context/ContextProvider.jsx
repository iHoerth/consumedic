import { createContext, useState } from 'react';
import axios from 'axios';

export const Context = createContext([]);

const URL_USERS = `https://jsonplaceholder.typicode.com/users`;
const URL_POSTS = `https://jsonplaceholder.typicode.com/posts`;

const ContextProvider = ({ children }) => {
  //Definimos el estado para los users, con todas sus acciones
  const [usersData, setUsersData] = useState({
    users: [],
    filteredUsers: [],
    userDetail: {},
    getUserById: async () => {},
    createUser: async () => {},
  });


  //Definimos el estado para los medicos, con todas sus acciones
  const [doctorsData, setDoctorsData] = useState({
    doctors: [],
    filteredDoctors: [],
    doctorDetail: {},
    getDoctors: async () => {
      const response = await axios(URL_POSTS);
      const data = await response.data;
      setDoctorsData((prevState) => ({
        ...prevState,
        doctors: [...prevState.doctors, ...data],
      }));
    },
    getDoctorById: async () => {},
    createDoctor: async () => {},
  });

  return (
    <>
      <Context.Provider value={{ doctorsData, usersData }}>
        {children}
      </Context.Provider>
    </>
  );
};

export default ContextProvider;
