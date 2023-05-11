import { Routes, Route } from 'react-router-dom';
import { Home, Landing, Login, Doctors, DoctorDetail } from './views';
import PatientPanel from './views/PatientPanel/PatientPanel';
import PatientNewUser from "./views/PatientNewUser/PatientNewUser";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/search" element={<Doctors />} />
        <Route path="/medicalDetail" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<PatientNewUser />} />
        <Route path='/patientpanel' element={<PatientPanel/>}/>
      </Routes>
    </div>
  );
}

export default App;
