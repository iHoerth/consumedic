import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home,Landing,SpecialistsFound, MedicalProfileDetail } from "./views"

import './App.css';


function App() {

  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/landing' element={<Landing />}/>
          <Route path='/all' element={<SpecialistsFound />}/>
          <Route path='/medicalDetail' element={<MedicalProfileDetail />}/>
        </Routes>
     
    </div>
  );
}

export default App;
