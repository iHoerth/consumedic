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
import Appointment from './views/Appointment/Appointment';
import CreateDoctor from './views/CreateDoctor/CreateDoctor';
import { LoginMedico } from './views';

import { useContext, useEffect } from 'react';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';

const App = () => {
  const { fetchUtilities } = useContext(UtilitiesContext);
  const { fetchDoctors } = useContext(Context)[0];

  useEffect(() => {
    fetchUtilities();
    fetchDoctors();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginMedico" element={<LoginMedico />} />
        <Route path="/createDoctor" element={<CreateDoctor />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/patientpanel/:id" element={<PatientPanel />} />
        <Route path="/turno/:id/:fecha/:hora" element={<Appointment />} />
      </Routes>
    </div>
  );
};

export default App;
