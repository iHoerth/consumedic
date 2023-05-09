import { Routes, Route } from 'react-router-dom';

import { Home, Landing, SpecialistsFound, UserLogin } from './views';

import './App.css';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/all" element={<SpecialistsFound />} />
      </Routes>
    </div>
  );
}

export default App;
