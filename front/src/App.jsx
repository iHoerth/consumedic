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
import DoctorDashboard from './views/DoctorDashboard/DoctorDashboard'

import { useContext, useEffect } from 'react';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';
import CreateDoctor from './views/CreateDoctor/CreateDoctor';
import LoginDoctor from './views/LoginDoctor/LoginDoctor';
import Error404 from './components/Error404/Error404';
import Loading from './components/Loading/Loading';

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
        <Route path="/loginDoctor" element={<LoginDoctor />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/createDoctor" element={<CreateDoctor />} />
        <Route path="/patientpanel/:id" element={<PatientPanel />} />
        <Route path="/turno/:id/:fecha/:hora" element={<Appointment />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/perfilMedico" element={<DoctorDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
