import { useContext, useState, useEffect } from "react";
import axios from "axios";

import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavBar from '../../components/NavBar/NavBar';
import Filter from '../../components/Filter/Filter'


import { Context } from "../../context/ContextProvider";

import style from './DoctorsList.module.css';


const DoctorsList = () => {
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
    const data = async () => {
      await axios.post("http://localhost:3001/fake");
    };
    data();

    fetchDoctors();
  }, []);

  return (
    <>
      <NavBar />
      <Filter />
      <div className={style.divSpecialists}>
        <SearchBar />
        <CardsContainer doctorsInPage={doctorsInPage} />
        <Pagination
          maxPages={maxPages}
          page={currentPage}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default DoctorsList;
