import { Routes, Route } from 'react-router-dom';
import { Home, Landing, Login, DoctorsList, DoctorDetail } from './views';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
