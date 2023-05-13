import * as React from "react";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";

const preventDefault = (event) => event.preventDefault();

const Footer = () => {
  return (
    <Box
      sx={{
        // flexGrow: 1,
        width: "100%",
        height: "100px",
        backgroundColor: "#bdbdbd",
        typography: "body1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& > :not(style) + :not(style)": {
          ml: 2,
          backgroundColor: "white",
          padding: "10px",
        },
      }}
      onClick={preventDefault}
    >
      <NavLink
        to="/home"
        sx={{
          color: "white",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          height: "100%",
        }}
      >
        HOME
      </NavLink>
      <NavLink
        to="/login"
        sx={{
          color: "black",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          height: "100%",
        }}
      >
        LOGIN
      </NavLink>
      <NavLink
        to="/"
        sx={{
          color: "white",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          height: "100%",
        }}
      >
        LANDING
      </NavLink>
    </Box>
  );
};

export default Footer;
