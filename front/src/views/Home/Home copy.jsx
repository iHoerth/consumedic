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
    <Box component='div' sx={{ border: '4px solid black',display:'flex', flexDirection:'column'  }}>
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
          width: '100%',
          height: '900px',
          objectFit: 'cover',
        }}
        // src={bannerImages[0].imgPath}
        src=""
        alt=""
      >
        <Box
          sx={{
            // position: 'absolute',
            top: '20px',
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
              p: 2,
            }}
          >
            <Header />
            <SearchBar handleSearch={handleSearch} />
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            minHeight: theme.heights.homeSection,
            width: '100%',
            margin: 0,
            boxSizing: 'border-box',
            padding: 0,
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
    </Box>
  );
};

export default Home;
