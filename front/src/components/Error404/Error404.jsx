import { Typography, Box } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Error404 = () => {
  return (
    <>
      <NavBar variant={'block'} />
      <Box variant="" display='flex' flexDirection='column' sx={{ border: '1px solid yellow', height: '55vh', justifyContent:'center', alignItems:'center' }}>
        <Typography variant="h1" sx={{ fontSize: 50 }}>
          {`Oops! :(`}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 50 }}>
          {`No pudimos encontrar esa pagina`}
        </Typography>
      </Box>
      <Footer />
    </>
  );
};

export default Error404;
