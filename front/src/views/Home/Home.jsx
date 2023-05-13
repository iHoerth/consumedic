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

// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';

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
          padding: '80px 0', //Establece el padding de la sección
          backgroundColor: '#f5f5f5', //Establece el color de fondo de la sección
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '40px' }}>
          Mi Sección
        </Typography>
        <Typography variant="body1">
          Aquí va el contenido de mi sección
        </Typography>
        <Box
        component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      {/* <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Image
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Video
          </Typography>
        </CardContent>
      </Card> */}
      </Box>
      </Box>
      <Footer />
    </Box>
    // </div>
  );
};



export default Home;
