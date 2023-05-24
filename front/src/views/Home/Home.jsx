import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

import { Box, Card, CardContent, Modal, Typography, useMediaQuery } from '@mui/material';
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
  const { values } = theme.breakpoints;
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
    <>
      <Modal open={modalOpen} onClose={handleClose}>
        <>
          <Loading />
        </>
      </Modal>
      <NavBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={6000}
        >
          {bannerImages.map((step, index) => (
            <div
              style={{
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
              }}
              key={step.imgPath}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    height: '760px',
                    mt: '0px',
                    mb: '500px',
                    objectFit: 'cover',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </div>
      <Box
        sx={{
          position: 'absolute',
          top: '100px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            // pb: '120px',
          }}
        >
          <Header />
          <SearchBar handleSearch={handleSearch} />
        </Box>

        <Box
          component="div"
          sx={{
            minHeight: theme.heights.homeSection,
            width: '100%',
            margin: 0,
            boxSizing: 'border-box',
            padding: 0,
            border: '1px solid black',
            flexWrap: 'wrap',
            display: {
              mobile: 'flex',
              tablet: 'flex',
              laptop: 'grid',
              desktop: 'grid',
            },
            gap: {
              mobile: '50px',
              tablet: '50px',
              laptop: '100px 120px',
              desktop: '100px 120px',
            },
            gridTemplateColumns: 'repeat(2, minmax(Min(400px), 1fr))',
            placeItems: 'center',
            padding: '60px',
          }}
        >
          {homeCards.map((text, index) => (
            <Card
              sx={{
                width: {
                  mobile: '100%',
                  tablet: '100%',
                  laptop: 360,
                  desktop: 360,
                },
                padding: 2,
                height: 260,
                display: 'grid',
                placeItems: 'center',
              }}
              key={`homeCards${index}`}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {text.title}
                </Typography>
                <Typography sx={{ fontSize: 14, wordSpacing: '0.2rem' }}>{text.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <AboutUs />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
