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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  specialty,
}) => {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const { values } = theme.breakpoints;

  let averageRating = stars && stars.reduce((acc, cur) => acc + cur.puntaje, 0) / stars.length;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <CardMUI
      sx={{
        transition: '0.05s',
        borderRadius: 1,
        width: {
          mobile: '100vw',
          tablet: values.tablet,
          laptop: values.tablet,
          desktop: 570,
        },
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
            <Box display='flex'>
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
          <Box component="div" sx={{ display: 'flex' }}>
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
          </Box>
          <CardContent>
            <Stack spacing={1}>
              <StyledRating name="controlled-rating" value={averageRating} readOnly  />
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="primary" />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="primary" />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Tooltip title="Ver Agenda">
                <ExpandMoreIcon color="primary" />
              </Tooltip>
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Agenda Disponible:</Typography>
              <Typography paragraph></Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </CardMUI>
  );
};

export default Card;
