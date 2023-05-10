import { createContext, useState } from 'react';
import axios from 'axios';

const URL_USERS = `https://jsonplaceholder.typicode.com/users`;
const URL_POSTS = `https://jsonplaceholder.typicode.com/posts`;

export const UserContext = createContext();
export const DoctorContext = createContext();

const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);  
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios(URL_USERS);
    const data = await response.data;
    setUsers(data);
    setFilteredUsers(data);
  };

  const getUserById = async (id) => {
    const response = await axios(`${URL_USERS}/${id}`);
    const data = await response.data;
    setUsers(data); // ----> tal vez definir otro estado userDetail...
    setFilteredUsers(data);
  };

  const createUser = async () => {
    //aca el post a la ruta correspondiente
  };

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const getDoctors = async () => {
    const response = await axios(URL_POSTS);
    const data = await response.data;
    setDoctors(data);
    setFilteredDoctors(data);
  };

  const getDoctorById = async (id) => {
    const response = await axios(`${URL_POSTS}/${id}`);
    const data = await response.data;
    setDoctors(data); // ----> tal vez definir otro estado doctorDetail...
    setFilteredDoctors(data);
  };

  const createDoctor = async () => {
    //aca el post a la ruta correspondiente
  };

  return (
    <UserContext.Provider value={{ users, filteredUsers, getUsers, getUserById, createUser }}>
      <DoctorContext.Provider
        value={{ doctors, filteredDoctors, getDoctors, getDoctorById, createDoctor }}
      >
        {children}
      </DoctorContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;
