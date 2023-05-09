import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NavBarMui from '../../components/NavBar/NavBarMUI';
import SearchBar from "../../components/SearchBar/SearchBar"

const Home = () => {
  return (
    <div>
      <NavBarMui />
      {/* <NavBar /> */}
      <SearchBar />
    </div>
  )
}

export default Home
