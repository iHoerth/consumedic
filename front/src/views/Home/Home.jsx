import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// 

//agr Appbar al Box importado 
// function ElevationScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }


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
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images?.length ?? 0;
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    
    
  return (
    <div>
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
          maxWidth: '100%',
          flexGrow: 1, 
          position: 'relative', 
          left: '62%', 
          transform: 'translateX(-50%)',
          zIndex: 1,
          top: 20, 
          // '& .MuiMobileStepper-dotActive': {
          //   backgroundColor: theme.palette.primary.main,
          // },
          '@media (min-width: 600px)': {
            maxWidth: 400,
            transform: 'translate(-50%, -50%)',
          },
        }}
      />

    </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <NavBar /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Header />
          <SearchBar />
        </Box>
      </Box>
      <Footer />
    </div>
  );
};



export default Home;
