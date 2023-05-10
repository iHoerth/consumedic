import { useContext, useState, useEffect } from 'react';
import { Context } from '../../context/ContextProvider';

import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';

import style from './DoctorsList.module.css';
import { calculateMaxPages } from '../../helpers/helpers';

import axios from 'axios';

const Doctors = () => {
  // const { usersData , doctorsData} = useContext(Context);

  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 15;
  const maxPages = Math.ceil(doctors.length / doctorsPerPage);

  const lastDoctorIndex = doctorsPerPage * currentPage;
  // const firstDoctorIndex = (currentPage - 1) * doctorsPerPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;

  const doctorsInPage = doctors.slice(firstDoctorIndex, lastDoctorIndex);

  const handleChange = (event, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    const getDoctors = async () => {
      const data = (await axios(`http://localhost:3001/doctors`)).data;
      console.log(data);
      setDoctors(data);
    };
    getDoctors();
  }, []);

  return (
    <div className={style.divSpecialists}>
      <SearchBar />
      <CardsContainer doctorsInPage={doctorsInPage} />
      <Pagination maxPages={maxPages} page={currentPage} handleChange={handleChange} />
    </div>
  );
};

export default Doctors;
