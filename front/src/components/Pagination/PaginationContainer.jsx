import { useState } from 'react';
import { Pagination, Typography } from '@mui/material';

const PaginationContainer = ({page, handleChange}) => {
  
  return (
    <>
      <Typography>
        CURRENT PAGE IS {page}
      </Typography>
      <Pagination count={10} onChange={handleChange} color="secondary" />
    </>
  );
};

export default PaginationContainer;
