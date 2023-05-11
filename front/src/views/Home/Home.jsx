import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ImageHome from "../../components/ImageHome/ImageHome";

import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar />
      <Box
        sx={{
          bgcolor: "#e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <ImageHome />
        <SearchBar />
      </Box>
    </Box>
  );
};

export default Home;
