import { useState } from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

import { Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AboutUs from '../../components/AboutUs/AboutUs';

import cards22 from '../../assets/Img/cards22.jpg';

import banner from '../../assets/Img/10.jpg'
import { bannerImages } from '../../helpers/helpers';
import { homeCards } from '../../helpers/helpers';

const HomeNuevo = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <NavBar />

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
        style={{
          maxWidth: '150%',
          maxHeight: '100vh',
          // width: '1920px',
          margin: '0 auto',
        }}
      >
        {bannerImages.map((step, index) => (
          <div
            style={{
              overflow: 'hidden',
              display: 'auto',
              alignItems: 'center',
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
                  maxWidth: 'auto',
                  width: '100%',
                  mt: '0px',
                  mb: '500px',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
     
        <Box
          sx={{
            position: 'absolute',
            top: '100px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
              flexDirection: 'column',
              justifyContent: 'end',
              alignItems: 'center',
              gap: '20px',
              height: '72.5vh',
              pb: '120px',
            }}
          >
            <Header />
            <SearchBar />
          </Box>

          <Box //cuadro grande
            component="span"
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(Min(400px), 1fr))',
              placeItems: 'center',
              height: '60vh',
              gap: '40px',
              padding: '60px',
            }}
          >
            {homeCards.map((text, index) => (
              <Card sx={{width:400}} key={`homeCards${index}`}>
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

export default HomeNuevo;
