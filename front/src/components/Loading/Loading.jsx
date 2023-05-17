import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <>
      <Box
        sx={{
          height: '60vh',
        }}
      >
        <CircularProgress sx={{position:'fixed', top:'30%',left:'50%'}}/>
      </Box>
    </>
  );
};

export default Loading;
