import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";



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

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images?.length ?? 0;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  return (
    <Box sx={{ maxWidth: 'auto', flexGrow: 1, position: 'relative' }}>
      <NavBar />
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 0,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={7000} // 7 second delay between each slide
      >
        {images.map((step, index) => (
          <div key={step.imgPath}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'flex',
                  maxWidth: 'auto',
                  overflow: 'hidden',
                  width: '100%',
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
        position="absolute"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1, 
          position: 'absolute', top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
      }}
      />
      <Button
        component={Link}
        to="/home"
        variant="contained"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          width: 200,
          height: 50,
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease', 
          '&:hover': {
            backgroundColor: '#212121',
            color: '#ffff00'
          },
          fontSize: '1.2rem',
        }}
      >
        Ingresar 
      </Button>
    </Box>
  );
}
export default SwipeableTextMobileStepper;


