import { CircularProgress, Box } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Loading = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
      <Footer />
    </>
  );
};

export default Loading;
