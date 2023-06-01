import { useContext, useState, useEffect } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { Modal } from '@mui/material';

import Home from '../Home/Home';
import NavBar from '../../components/NavBar/NavBar';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import Loading from '../../components/Loading/Loading';
import Filter from '../../components/Filter/Filter';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import { Context } from '../../context/ContextProvider';
import cards22 from '../../assets/Img/cards22.jpg';

const DoctorsList = () => {
  const [loading, setLoading] = useState(true);
  const { doctors, filteredDoctors } = useContext(Context)[0];
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();
  const { values } = theme.breakpoints;

  const doctorsPerPage = 15;
  const maxPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const lastDoctorIndex = doctorsPerPage * currentPage;
  const firstDoctorIndex = lastDoctorIndex - doctorsPerPage;

  const doctorsInPage = filteredDoctors.slice(firstDoctorIndex, lastDoctorIndex);

  const handlePageChange = (event, p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    if (doctors.length) {
      setLoading(false);
    }
  }, [loading, filteredDoctors]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundColor: theme.palette.background.main,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            height: '130px',
          }}
        ></Box>
        <Box
          component="div"
          sx={{
            width: {
              mobile: '99.5%',
              tablet: '99.5%',
              laptop: '99.5%',
              desktop: values.desktop,
            },
            minWidth: '200px',
            p: 2,
          }}
        >
          <Filter handlePageChange={handlePageChange} />
        </Box>
        {loading ? (
          <Loading />
        ) : (
          <Box
            sx={{
              width: '100%',
              display:"flex",
              alignItems:"center",
              flexDirection:'column'
            }}
          >
            <CardsContainer doctorsInPage={doctorsInPage} />
            <Pagination
              sx={{margin:'100px'}}
              maxPages={maxPages}
              page={currentPage}
              handlePageChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default DoctorsList;
