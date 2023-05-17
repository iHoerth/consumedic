import React, { useState } from 'react';
import { CircularProgress, Box, Modal } from '@mui/material';

const Loading = ({ loading }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);



  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
