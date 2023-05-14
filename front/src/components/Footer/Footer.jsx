import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  Box,
} from "@mui/material";
import {
  Home,
  Info,
  Lock,
  Facebook,
  Comment,
  Twitter,
  Instagram,
  People,
  RateReview,
} from "@mui/icons-material";

const preventDefault = (event) => event.preventDefault();

const Footer = () => {
  const [currentPage, setCurrentPage] = React.useState("home");
  const theme = useTheme();

  const handleNavigation = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        width: "100%",
        height: "35vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          mb: 1,
          width: "100%",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <BottomNavigation
          value={currentPage}
          onChange={handleNavigation}
          sx={{
            bgcolor: theme.palette.secondary.main,
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            value="home"
            showLabel
          />
          <BottomNavigationAction
            label="About"
            icon={<Info />}
            value="about"
            showLabel
          />
          <BottomNavigationAction
            label="Team"
            icon={<People />}
            value="team"
            showLabel
          />
          <BottomNavigationAction
            label="Testimonials"
            icon={<Comment />}
            value="testimonials"
            showLabel
          />
          <a href="/login" target="_blank" rel="noopener noreferrer">
            <BottomNavigationAction
              label="Login"
              icon={<Lock />}
              value="login"
              showLabel
            />
          </a>
        </BottomNavigation>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          mb: 1,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <NavLink to="https://www.facebook.com" target="_blank">
          <Facebook
            sx={{
              mx: 1,
              color: theme.palette.primary.main,
              fontSize: "30px",
              ml: "30px",
              mr: "30px",
            }}
          />
        </NavLink>
        <NavLink to="https://www.twitter.com/" target="_blank">
          <Twitter
            sx={{
              mx: 1,
              color: theme.palette.primary.main,
              fontSize: "30px",
              ml: "30px",
              mr: "30px",
            }}
          />
        </NavLink>
        <NavLink to="https://www.instagram.com" target="_blank">
          <Instagram
            sx={{
              mx: 1,
              color: theme.palette.primary.main,
              fontSize: "30px",
              ml: "30px",
              mr: "30px",
            }}
          />
        </NavLink>
      </Box>
      <Box
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {`Copyright © ${new Date().getFullYear()}
          Consumedic. Encontrá tu especialista y pedí turno`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
