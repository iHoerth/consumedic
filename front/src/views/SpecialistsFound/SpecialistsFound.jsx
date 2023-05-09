import React from 'react'
import CardsSpecialistsContainer from '../../components/CardsSpecialistsContainer/CardsSpecialistsContainer'
import SearchBar from "../../components/SearchBar/SearchBar"

const SpecialistsFound = () => {
  return (
    <div>
      <SearchBar/>
      Se mostrara el listado de todos los especialistas buscados
      <CardsSpecialistsContainer/>
    </div>
  )
}

export default SpecialistsFound