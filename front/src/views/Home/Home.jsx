import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

import { Box, Grid, Card, CardContent, Modal, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AboutUs from '../../components/AboutUs/AboutUs';

import { bannerImages } from '../../helpers/helpers';
import { homeCards } from '../../helpers/helpers';

import { Context } from '../../context/ContextProvider';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const theme = useTheme();
  // const { values } = theme.breakpoints;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { fetchDoctors, doctors } = useContext(Context)[0];

  const handleSearch = () => {
    setModalOpen(true);
    fetchDoctors().then((res) => {
      setModalOpen(false);
      navigate('/search');
    });
  };
  const handleClose = () => setModalOpen(false);

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
      }}
    >
      <Modal open={modalOpen} onClose={handleClose}>
        <>
          <Loading />
        </>
      </Modal>
      <NavBar />
      <Box
        component="div"
        sx={{
          backgroundImage: `url(${bannerImages[0].imgPath})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          height: theme.heights.homeSection,
          objectFit: 'cover',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            height: theme.heights.homeSection,
            p: 2,
          }}
        >
          <Header />
          <SearchBar handleSearch={handleSearch} />
        </Box>
      </Box>

      <Grid
        mt={1}
        container
        spacing={2}
        sx={{
          minHeight: theme.heights.homeSection / 2,
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {homeCards.map((text, index) => (
          <Grid item mobile={12} tablet={6} laptop={6} desktop={3} key={`homeCards${index}`}>
            <Card
              sx={{
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {text.title}
                </Typography>
                <Typography sx={{ fontSize: 14, wordSpacing: '0.2rem' }}>{text.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AboutUs />

      <Footer />
    </Box>
  );
};

export default Home;
