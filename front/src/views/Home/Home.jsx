import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Modal,
  Typography,
  useMediaQuery,
  Icon,
  Divider,
} from '@mui/material';
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

import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const iconsArray = [<SearchIcon />, <EventAvailableIcon />, <WatchLaterIcon />, <ThumbUpIcon />];

const Home = () => {
  const { fetchDoctors } = useContext(Context)[0];
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const { values } = theme.breakpoints;
  const navigate = useNavigate();

  const handleSearch = () => {
    setModalOpen(true);
    fetchDoctors().then((res) => {
      setModalOpen(false);
      navigate('/search');
    });
  };
  const handleClose = () => setModalOpen(false);
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: theme.palette.background.main,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
      }}
    >
      <Modal open={modalOpen} onClose={handleClose}>
        <>
          <Loading />
        </>
      </Modal>
      <NavBar variant='scorlleable'/>
      <Box
        component="div"
        sx={{
          backgroundImage: `url(${bannerImages[0].imgPath})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          height: theme.heights.homeSection,
          objectFit: 'cover',
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
            p: 2,
            minWidth: '260px',
          }}
        >
          <Header />
          <SearchBar handleSearch={handleSearch} />
        </Box>
      </Box>

      <Grid
        mt={1}
        container
        spacing={2}
        sx={{
          minHeight: theme.heights.homeSection / 2,
          justifyContent: 'center',
          padding: '10px',
          width: {
            mobile: '99.5%',
            tablet: '99.5%',
            laptop: '99.5%',
            desktop: values.desktop,
          },
          alignSelf: 'center',
          pt: 8,
        }}
      >
        {homeCards.map((text, index) => (
          <Grid item mobile={12} tablet={6} laptop={6} desktop={3} key={`homeCards${index}`}>
            <Card
              sx={{
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                minWidth: '210px',
              }}
            >
              <CardContent>
                <Box display="flex" flexDirection={'row'} gap={1}>
                  <Icon color="primary">{iconsArray[index]}</Icon>
                  <Typography sx={{ fontSize: 16 }} gutterBottom>
                    {text.title}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 14, wordSpacing: '0.2rem' }}>{text.body}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          bgcolor: 'lightgray',
          height: 1,
          mb: 8,
          width: {
            mobile: '99%',
            tablet: '99%',
            laptop: '99%',
            desktop: values.desktop - 40,
          },
          justifySelf: 'center',
          alignSelf: 'center',
        }}
      />

      <AboutUs />

      <Footer />
    </Box>
  );
};

export default Home;
