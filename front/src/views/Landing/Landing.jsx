<<<<<<< HEAD
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
=======
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Button } from '@mui/material';
import ImageHome from '../../components/ImageHome/ImageHome';
>>>>>>> origin/main

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: '',
    imgPath:
      '/images/1.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/4.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/5.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/6.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/7.jpg',
  },
  {
    label: '',
    imgPath:
      '/images/7.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
<<<<<<< HEAD
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis='x'
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      
        {...virtualize ({ slideRenderer: ({index}) => {
            return (
              <Box
                key={images[index].label}
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={images[index].imgPath}
                alt={images[index].label}
              />
            );
          }})}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
=======
    <>
      <NavBar />
      <div className={style.container}>
        <ImageHome />
        <div className={style.buttonContainer}>
          <Button href='/home' variant="contained" sx={{ width: '200px' }}>
            BUSCAR MEDICOS YA! NO AGUANTO MAS!!!
>>>>>>> origin/main
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;


