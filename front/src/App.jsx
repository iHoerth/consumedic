import { Routes, Route } from 'react-router-dom';
import {
  Home,
  HomeNuevo,
  Landing,
  Login,
  DoctorsList,
  CreatePatient,
  PatientPanel,
  DoctorDetail,
} from './views';
import Appointment from './views/Appointment/Appointment';

import { useContext, useEffect } from 'react';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';
import CreateDoctor from './views/CreateDoctor/CreateDoctor';
import LoginDoctor from './views/LoginDoctor/LoginDoctor';

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
        {/* HOME NUEVO */}
        {/* <Route path="/home" element={<HomeNuevo />} /> */}
        {/* HOME NUEVO */}

        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<HomeNuevo />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path='/loginDoctor' element={<LoginDoctor/>}/>
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/createDoctor" element={<CreateDoctor />} />
        <Route path="/patientpanel/:id" element={<PatientPanel />} />
        <Route path="/turno/:id/:fecha/:hora" element={<Appointment />} />
      </Routes>
    </div>
  );
};

export default App;
