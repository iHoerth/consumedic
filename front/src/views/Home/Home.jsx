import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';

import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <NavBar />
      <Box>
        <SearchBar />
      </Box>
    </Box>
  );
};

export default Home;
