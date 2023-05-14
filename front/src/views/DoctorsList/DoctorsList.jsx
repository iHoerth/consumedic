import { useContext, useState, useEffect } from "react";

import Pagination from "../../components/Pagination/Pagination";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

import NavBar from "../../components/NavBar/NavBar";
import Filter from "../../components/Filter/Filter";

import { Context } from "../../context/ContextProvider";

// import style from "./DoctorsList.module.css";
import cards22 from '../Img/cards22.jpg'
import { Container } from "@mui/material";


const DoctorsList = () => {
  const [doctorsData] = useContext(Context);
  const { doctors, fetchDoctors, fetchDoctorByEmail, filteredDoctors } =
    doctorsData;

  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 15;
  const maxPages = Math.ceil(doctors.length / doctorsPerPage);

  const lastDoctorIndex = doctorsPerPage * currentPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;

  const doctorsInPage = filteredDoctors.slice(
    firstDoctorIndex,
    lastDoctorIndex
  );

  const handleChange = (event, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <NavBar />
      <Container
        // className={style.divSpecialists}
        sx={{ 
          backgroundImage: `url('${cards22}')`,
          backgroundPosition: "bottom",
          backgroundPositionY: "70%", 
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "relative",
          width: "100%",
          height: "115vh",
          display: "flex",
          pb: "20px",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll"
        }}
      >
        <Filter 
        />
        <CardsContainer doctorsInPage={doctorsInPage} />
        <Pagination
          maxPages={maxPages}
          page={currentPage}
          handleChange={handleChange}
        />
      </Container>
    </>
  );


  // return (
  //   <>
  //     <NavBar />
  //     <div className={style.divSpecialists}>
  //       <Filter />
  //       <CardsContainer doctorsInPage={doctorsInPage} />
  //       <Pagination
  //         maxPages={maxPages}
  //         page={currentPage}
  //         handleChange={handleChange}
  //       />
  //     </div>
  //   </>
  // );
};

export default DoctorsList;
