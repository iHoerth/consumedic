import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import DoctorDashboard from './views/DoctorDashboard/DoctorDashboard';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';
import CreateDoctor from './views/CreateDoctor/CreateDoctor';
import LoginDoctor from './views/LoginDoctor/LoginDoctor';
import Error404 from './components/Error404/Error404';
import Loading from './components/Loading/Loading';

const App = () => {
  const { fetchUtilities } = useContext(UtilitiesContext);
  const { fetchDoctors } = useContext(Context)[0];
  const { session, setSession } = useContext(Context)[2];


  useEffect(() => {
    fetchUtilities();
    fetchDoctors();
    //! aca habria que tener una fn que se fije si el token expiro, y si expiro que setee la sesion en vacio
  }, []);


  return (
    <div className="App">
      <Routes>
        {session.token ? (
          session.isDoctor ? (
            <>
              <Route path="*" element={<Error404 />} />
              <Route path="/loading" element={<Loading />} />

              <Route path="/" element={<Home />} />
              <Route path="/perfilMedico" element={<DoctorDashboard />} />
              <Route path="/search" element={<DoctorsList />} />
              <Route path="/detail/:id" element={<DoctorDetail />} />
              <Route path="/turno/:id/:fecha/:hora/:estado/:comentario" element={<Appointment />} />

              <Route path="/login" element={<Navigate replace to={"/perfilMedico"} />} />
              <Route path="/loginDoctor" element={<Navigate replace to={"/perfilMedico"} />} />
              <Route path="/create" element={<Navigate replace to={"/perfilMedico"} />} />
              <Route path="/createDoctor" element={<Navigate replace to={"/perfilMedico"} />} />
              <Route path="/patientpanel/" element={<Navigate replace to={"/perfilMedico"} />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Error404 />} />
              <Route path="/loading" element={<Loading />} />

              <Route path="/" element={<Home />} />
              <Route path="/patientpanel/" element={<PatientPanel />} />
              <Route path="/search" element={<DoctorsList />} />
              <Route path="/detail/:id" element={<DoctorDetail />} />
              <Route path="/turno/:id/:fecha/:hora/:estado/:comentario" element={<Appointment />} />

              <Route path="/login" element={<Navigate replace to={"/patientpanel"} />} />
              <Route path="/loginDoctor" element={<Navigate replace to={"/patientpanel"} />} />
              <Route path="/create" element={<Navigate replace to={"/patientpanel"} />} />
              <Route path="/createDoctor" element={<Navigate replace to={"/patientpanel"} />} />
              <Route path="/perfilMedico" element={<Navigate replace to={"/patientpanel"} />} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<DoctorsList />} />
            <Route path="/detail/:id" element={<DoctorDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginDoctor" element={<LoginDoctor />} />
            <Route path="/create" element={<CreatePatient />} />
            <Route path="/createDoctor" element={<CreateDoctor />} />
            <Route path="/patientpanel/" element={<PatientPanel />} />
            <Route path="/turno/:id/:fecha/:hora/:estado/:comentario" element={<Appointment />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/perfilMedico" element={<DoctorDashboard />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
