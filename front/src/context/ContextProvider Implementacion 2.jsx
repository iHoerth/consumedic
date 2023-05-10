import { createContext, useState } from 'react';
import axios from 'axios';

const URL_USERS = `https://jsonplaceholder.typicode.com/users`
const URL_POSTS = `https://jsonplaceholder.typicode.com/posts`

export const UserContext = createContext();
export const DoctorContext = createContext();

const ContextProvider = ({ children }) => {
  // Definimos el estado para los usuarios
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Definimos las funciones para manejar el estado de los usuarios
  const getUsers = async () => {
    const response = await axios(URL_USERS);
    const data = await response.data;
    setUsers(data);
    setFilteredUsers(data);
  };
  const getUserById = async () => {};
  const createUser = async () => {};

  // Definimos el estado para los doctores
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Definimos las funciones para manejar el estado de los doctores
  const getDoctors = async () => {
    const response = await axios(URL_POSTS);
    const data = await response.data;
    setDoctors(data);
    setFilteredDoctors(data);
  };
  const getDoctorById = async () => {};
  const createDoctor = async () => {};

  // Retornamos los proveedores de contexto
  return (
    <UserContext.Provider value={{ users, filteredUsers, getUsers, getUserById, createUser }}>
      <DoctorContext.Provider value={{ doctors, filteredDoctors, getDoctors, getDoctorById, createDoctor }}>
        {children}
      </DoctorContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;