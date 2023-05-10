import { useContext, useState } from 'react';
import { Pagination } from '@mui/material';
import { Context } from '../../context/ContextProvider';

import PaginationContainer from '../../components/Pagination/PaginationContainer';
import CardsSpecialistsContainer from '../../components/CardsSpecialistsContainer/CardsSpecialistsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import style from './SpecialistsFound.module.css';

const SpecialistsFound = () => {
  const { usersData } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);


  const handleChange = (event, p) => {
    setCurrentPage(p);
  };

  return (
    <div className={style.divSpecialists}>
      <SearchBar />
      <CardsSpecialistsContainer />

      <PaginationContainer page={currentPage} handleChange={handleChange} />
    </div>
  );
};

export default SpecialistsFound;
