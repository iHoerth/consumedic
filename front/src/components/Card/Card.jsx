import React from "react";
import { styled } from "@mui/material/styles";
import CardMUI from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { NavLink } from "react-router-dom";
import { Grid, useTheme } from "@mui/material";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  let averageRating =
    stars.reduce((acc, cur) => acc + cur.puntaje, 0) / stars.length;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    // <CardMUI
    // sx={{
    //   pl: "40px",
    //   borderRadius: 4, // agregar borde redondeado
    //   width: 400, // agregar ancho
    //   height: 500, // agregar altura
    //   // bgcolor: theme.palette.secondary.main,
    //   typography: theme.typography,
    //   }}
    // >
        <Grid container spacing={2}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={6} key={item}>
            <CardMUI
              sx={{
                pl: '40px',
                borderRadius: 4,
                width: 370,
                height: 600,
                mb: 6,
                typography: theme.typography,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 4,
              }}
            >

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
            sx={{ color: theme.palette.primary.main, textDecoration: "none" }}
          >
            {name}
          </NavLink>
        }
        subheader={
          specialty.length &&
          specialty.map((item, index) => <span key={index}>{item.name}</span>)
        }
      />
      <CardContent>
        <Stack spacing={1}>
          <Rating
            name="controlled-rating"
            value={averageRating}
            color="secondary"
          />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ pb: 3 }}>
          {opinions.length ? (
            opinions.map((item, index) => (
              <span key={index}>{item.mensaje}</span>
            ))
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
    </CardMUI>
    </Grid>
    ))}
    </Grid>
  );
};

export default Card;
