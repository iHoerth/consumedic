import { Typography, Box } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Error404 = () => {
  return (
    <>
      <NavBar variant={'block'} />
      <Box variant="" display='flex' flexDirection='column' sx={{ border: '1px solid yellow', height: '55vh', justifyContent:'center', alignItems:'center' }}>
        <img src="https://www.beedigital.es/wp-content/uploads/2021/06/Beedigital-404.jpg" alt="Error 404" style={{ width: '500px', marginBottom: '20px' }} />
        <Typography variant="h1" sx={{ fontSize: 50 }}>
          {`Oops! :(`}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 50 }}>
          {`No pudimos encontrar esa página`}
        </Typography>
      </Box>
      <Footer />
    </>
  );
};

export default Error404;
