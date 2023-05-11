import { useContext, useState, useEffect } from 'react';

import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';

import style from './DoctorsList.module.css';

import { Context } from '../../context/ContextProvider';

const Doctors = () => {
  const [doctorsData] = useContext(Context);
  const { doctors, fetchDoctors, fetchDoctorByEmail } = doctorsData;

  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 15;
  const maxPages = Math.ceil(doctors.length / doctorsPerPage);

  const lastDoctorIndex = doctorsPerPage * currentPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;

  const doctorsInPage = doctors.slice(firstDoctorIndex, lastDoctorIndex);

  const handleChange = (event, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    fetchDoctors();
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
