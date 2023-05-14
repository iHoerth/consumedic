import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { bannerImages } from '../../helpers/helpers';
import React, { useState } from 'react';

import box1 from '../Img/box1.jpg';
import box2 from '../Img/box2.jpg';
import box3 from '../Img/box3.jpg';
import box4 from '../Img/box4.jpg';




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
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: '100hv',
          margin: '0 auto',
        }}
      >
        {bannerImages.map((step, index) => (
          <div style={{
            overflow:'hidden',
            display: 'auto',
            alignItems: 'center',
            height: '100%',
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
                  width: '1920px',
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

      <NavBar />
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
            }
          }, 
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '72.5vh',
            '@media (max-width: 600px)': {
              height: {
                xs: '50vh',
                sm: '60vh',
                md: '70vh',
                lg: '80vh',
              }
            }, 
          }}
        >
        </Box>
        <Header style={{ position: 'absolute', top: '50px',  '@media (max-width: 600px)': {
            height: {
              xs: '50vh',
              sm: '60vh',
              md: '70vh',
              lg: '80vh',
            }
          },  }}/>
        <SearchBar />

        <Box //cuadro grande
          sx={{
            border: '1px solid blue',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:  '60px',
            height: '60vh',
            // flexDirection: isMobile ? 'column' : 'row',
            '@media (max-width: 600px)': {
              height: {
                xs: '50vh',
                sm: '60vh',
                md: '70vh',
                lg: '80vh',
              },            }, 
          }}
        >
          <Box // primer box con texto a la izq.
            sx={{
              backgroundImage: `url('${box1}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              width: isMobile ? '100%' : '300px',
              height: isMobile ? '200px' : '300px',
              border: '1px solid grey',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: isMobile ? '20px' : 0,
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              backgroundImage: `url('${box2}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "relative",
              width: '300px',
              height: '300px',
              border: '1px solid grey',
              borderRadius: '20px',              
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              backgroundImage: `url('${box3}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "relative",
              width: '300px',
              height: '300px',
              border: '1px solid grey',
              borderRadius: '20px',              
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              backgroundImage: `url('${box4}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "relative",
              width: '300px',
              height: '300px',
              border: '1px solid grey',
              borderRadius: '20px',              
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          ACA VA EL ABOUT US
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default HomeNuevo;
