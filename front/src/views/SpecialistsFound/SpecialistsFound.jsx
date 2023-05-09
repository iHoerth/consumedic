import React from "react";
import CardsSpecialistsContainer from "../../components/CardsSpecialistsContainer/CardsSpecialistsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./SpecialistsFound.module.css";

const SpecialistsFound = () => {
  return (
    <div className={style.divSpecialists}>
      <SearchBar />
      <CardsSpecialistsContainer />
    </div>
  );
};

export default SpecialistsFound;
