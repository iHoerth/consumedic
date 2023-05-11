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
import { NavLink } from "react-router-dom";

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

const Card = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardMUI>
      <Tooltip title="Ver Perfil">
        <IconButton sx={{ p: 0 }}>
          <NavLink to={`/detail/${props.id}`} activeClassName="active">
            <Avatar alt="Remy Sharp" src={props.profileImage} />
          </NavLink>
        </IconButton>
      </Tooltip>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<NavLink to={`/detail/${props.id}`}>{props.name}</NavLink>}
        subheader={props.specialty}
      />
      <CardContent>
        <Stack spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={props.stars}
            precision={0.5}
            readOnly
          />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          Especialidades: {props.specialty}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 3 }}>
          {props.opinions}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          {props.infoStudies}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          <LocationOnSharpIcon />
          {props.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          Consulta ${props.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="Ver Agenda">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Agenda Disponible:</Typography>
          <Typography paragraph>
            {props.agenda &&
              props.agenda.map((item, index) => <div key={index}>{item}</div>)}
          </Typography>
        </CardContent>
      </Collapse>
    </CardMUI>
  );
};

export default Card;
