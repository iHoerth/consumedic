import React from "react";
import { Typography, Rating, Box } from "@mui/material";

const Opinions = ({ opinions }) => {
  return (
    <div>
      {opinions.map((opinion, index) => (
        <div key={index}>
          <Typography variant="h6">{opinion.name}</Typography>
          <Typography variant="body1">{opinion.text}</Typography>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="stars" value={opinion.stars} readOnly />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default Opinions;
