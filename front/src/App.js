import { Routes, Route } from 'react-router-dom';

import { Home, Landing, SpecialistsFound, UserLogin } from './views';


import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <div className="App">
      {/* <ThemeProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/all" element={<SpecialistsFound />} />
      </Routes>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
