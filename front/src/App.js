import { Routes, Route } from 'react-router-dom';
import { Home, Landing, Login, DoctorsList, CreatePatient, PatientPanel, DoctorDetail, LoginMedico } from './views';

import './App.css';
import CreateDoctor from './views/CreateDoctor/CreateDoctor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginMedico" element={<LoginMedico />} />
        <Route path='/createDoctor' element={<CreateDoctor/>} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path='/patientpanel/:id' element={<PatientPanel/>}/>
      </Routes>
    </div>
  );
}

export default App;
