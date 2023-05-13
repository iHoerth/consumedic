import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { bannerImages } from '../../helpers/helpers';
import { useState } from 'react';

const HomeNuevo = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  // const maxSteps = bannerImages?.length ?? 0;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // const transition = {
  //   duration: 0.6,
  //   ease: [0.6, 0.05, -0.01, 0.9],
  // };

  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
      >
        {bannerImages.map((step, index) => (
          <div style={{overflow:'hidden'}} key={step.imgPath}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  position: 'relative',
                  display: 'flex',
                  maxWidth: 'auto',
                  width: '1920px',
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '72.5vh',
          }}
        >
          <SearchBar />
          <Header />
        </Box>
        <Box
          sx={{
            border: '1px solid blue',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '60px',
            height: '60vh',
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
              border: '1px solid red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              width: '300px',
              height: '300px',
              border: '1px solid red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              width: '300px',
              height: '300px',
              border: '1px solid red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            aca hay mucha info
          </Box>
          <Box
            sx={{
              width: '300px',
              height: '300px',
              border: '1px solid red',
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
            height: '70vh',
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
