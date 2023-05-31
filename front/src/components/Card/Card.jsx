import { styled } from '@mui/material/styles';
import CardMUI from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import VideocamIcon from '@mui/icons-material/Videocam';
import { NavLink } from 'react-router-dom';
import { Box, Grid, useTheme } from '@mui/material';
import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import Calendar from '../Calendar/Calendar';
import { useMediaQuery } from '@mui/material';
import { Context } from '../../context/ContextProvider';
import { useContext } from 'react';
import axios from 'axios';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#0fb1bc',
  },
});

const Card = ({
  id,
  profileImage,
  name,
  stars,
  opinions,
  infoStudies,
  location,
  price,
  agenda,
  calendar,
  specialty,
}) => {
  //?
  const [doctorData, setDoctorData] = useState({});
  //?
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  // const isScreenSmall = useMediaQuery(theme.breakpoints.down('1050'));
  const { values } = theme.breakpoints;
  let averageRating = stars && stars.reduce((acc, cur) => acc + cur.puntaje, 0) / stars.length;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const URL_DOCTORS = process.env.REACT_APP_URL_DOCTORS;

  useEffect(() => {
    setLoading(true);

    const getDoctorData = async () => {
      const result = (await axios(`${URL_DOCTORS}/${id}`)).data;
      setDoctorData({ ...result });
    };
    getDoctorData(id);

    if (doctorData.id) {
      setLoading(false);
    }
  }, [doctorData.id]);

  return (
    <CardMUI
      sx={{
        transition: '0.05s',
        borderRadius: 1,
        // width: isScreenSmall ? '80%' : '100%',
        width: {
          mobile: '100%',
          tablet: '80%',
          laptop: '80%',
          desktop: '100%',
        },
        margin: 'auto',
        height: 'auto',
        typography: theme.typography,
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
      }}
    >
      {loading ? (
        <>
          <Stack spacing={4}>
            <Box display="flex">
              <Skeleton variant="circular" sx={{ margin: 'auto auto' }} width={100} height={100} />
              <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
            </Box>
            <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Stack>
        </>
      ) : (
        <>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              // flexDirection: isScreenSmall ? 'column' : 'row',
              flexDirection: {
                mobile: 'column',
                tablet: 'column',
                laptop: 'row',
                desktop: 'row',
              },
              // Cambia a columna en pantallas menores a 1050px
              // width: isScreenSmall ? '60%' : '100%',
            }}
          >
            <CardContent sx={{ flex: 1, width: '100%' }}>
              <Tooltip title="Ver Perfil">
                <IconButton sx={{ p: 1 }}>
                  <NavLink to={`/detail/${id}`}>
                    <Avatar
                      alt="Remy Sharp"
                      src={profileImage}
                      sx={{
                        width: 120,
                        height: 120,
                      }}
                    />
                  </NavLink>
                </IconButton>
              </Tooltip>
              <CardHeader
                title={
                  <NavLink
                    to={`/detail/${id}`}
                    sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}
                  >
                    {name}
                  </NavLink>
                }
                subheader={
                  specialty.length &&
                  specialty.map((item, index) => <span key={index}>{item.name}</span>)
                }
              />
              <Stack spacing={1}>
                <StyledRating name="controlled-rating" value={averageRating} readOnly />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ pb: 3 }}>
                {opinions.length ? (
                  opinions.map((item, index) => <span key={index}>{item.mensaje}</span>)
                ) : (
                  <span>No hay opiniones disponibles</span>
                )}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
                {infoStudies}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
                <LocationOnSharpIcon color="primary" />
                Direccion: {location}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
                <VideocamIcon color="primary" />
                Consulta ${price}
              </Typography>
            </CardContent>

            {/* {console.log( agenda)} */}
            <CardContent sx={{ flex: 1, width: '100%' }}>
              <Typography>Agenda disponible:</Typography>

              <Calendar id={id} calendar={doctorData.calendar} />
            </CardContent>
          </Box>
        </>
      )}
    </CardMUI>
  );
};

export default Card;
