import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { styled } from '@mui/system';


const Home = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const images = [
    {
      label: '',
      imgPath:
        '/images/7.jpg',
    },
    {
      label: '',
      imgPath:
        '/images/8.jpg',
    },
    {
      label: '',
      imgPath:
        '/images/1.jpg',
    },
    {
      label: '',
      imgPath:
        '/images/10.jpg',
    },
    {
      label: '',
      imgPath:
        '/images/11.jpg',
    },
  ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 5;
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    const TPWidgetWrapper = styled('div')({
      maxWidth: 'none',
      minHeight: '150px',
      minWidth: '300px',
      willChange: 'transform',
    });
    
  return (
    // <div>
      <Box sx={{ maxWidth: {
      xs: '100%', 
      sm: '80%', 
      md: '60%', 
      lg: '50%', 
    }, 
    flexGrow: 1, 
    position: 'relative',
    margin: '0 auto' }}>
      <NavBar />
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 0,
          pl: 2,
          mt: '0.03rem',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          height: {
            xs: '50vh',
            sm: '60vh',
            md: '70vh',
            lg: '80vh',
          },
        }}
      >
        {images.map((step, index) => (
          <div key={step.imgPath}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                style={{
                  display: 'flex',
                  maxWidth: '100%',
                  maxHeight: '70vh', 
                  margin: '0 auto',
                  position: 'relative',
                  opacity: activeStep === index ? 1 : 0,
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
  ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          maxWidth: 75,
          flexGrow: 1, 
          position: 'relative', 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 1,
          mt: 2,
          mb: {
            xs: 2,
            sm: 4,
          },
        }}
      />

      <Box
      sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: {
              xs: 4,
              sm: 8,
              md: 12,
              lg: 16,
            },
          }}
      >
        <Header />
        <SearchBar />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 0', 
          backgroundColor: '#f5f5f5', 
          height: '500px',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '40px' }}>
          Mi Sección
        </Typography>
        <Typography variant="body1">
          Aquí va el contenido de mi sección
        </Typography>
        <TPWidgetWrapper>
          {/* Contenido */}
        </TPWidgetWrapper>
      </Box>
      <Footer />
    </Box>
    // </div>
  );
};



export default Home;
