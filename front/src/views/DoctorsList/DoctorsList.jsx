import { useContext, useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';

import NavBar from '../../components/NavBar/NavBar';
import Filter from '../../components/Filter/Filter';

import { Context } from '../../context/ContextProvider';

import cards22 from '../Img/cards22.jpg';
import { Box, Container } from '@mui/material';

const DoctorsList = () => {
  const [loading, setLoading] = useState(true);
  const { doctors, fetchDoctors, filteredDoctors } = useContext(Context)[0];

  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 15;
  const maxPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const lastDoctorIndex = doctorsPerPage * currentPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;

  const doctorsInPage = filteredDoctors.slice(firstDoctorIndex, lastDoctorIndex);

  const handlePageChange = (event, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    // fetchDoctors();
    if (doctors.length) {
      setLoading(false);
    }
  }, [loading, filteredDoctors]);

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url('${cards22}')`,
          backgroundPosition: 'bottom',
          backgroundPositionY: '70%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // marginTop: "15%",

          '@media (max-width: 600px)': {
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            height: '200px',
          }}
        ></Box>
        <Filter handlePageChange={handlePageChange} />
        <CardsContainer
          doctorsInPage={doctorsInPage}
          sx={{
            width: '400px',
          }}
        />
        <Pagination maxPages={maxPages} page={currentPage} handlePageChange={handlePageChange} />
        <Footer />
      </Box>
    </>
  );
};

export default DoctorsList;
