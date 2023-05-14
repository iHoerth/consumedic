import PaginationMUI from '@mui/material/Pagination'

const Pagination = ({page, maxPages, handleChange}) => {
  

  return (
    <>
      <PaginationMUI 
        count={maxPages} 
        onChange={handleChange} 
        color="primary"
        sx={{ padding: '10px' }}
      />
    </>
  );
};

export default Pagination;
