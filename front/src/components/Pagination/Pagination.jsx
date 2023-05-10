import PaginationMUI from '@mui/material/Pagination'

const Pagination = ({page, maxPages, handleChange}) => {
  

  return (
    <>
      <PaginationMUI count={maxPages} onChange={handleChange} color="secondary" />
    </>
  );
};

export default Pagination;
