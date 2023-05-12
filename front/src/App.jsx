import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Landing,
  Login,
  DoctorsList,
  CreatePatient,
  PatientPanel,
  DoctorDetail,
} from './views';
import { useContext, useEffect } from 'react';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';

const App = () => {
  const { utilities, fetchUtilities } = useContext(UtilitiesContext);

  useEffect(() => {
    fetchUtilities();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/patientpanel/:id" element={<PatientPanel />} />
      </Routes>
    </div>
  );
};

export default App;
