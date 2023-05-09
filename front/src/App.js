import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpecialistsFound, Landing ,Home } from './views';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/landing' element={<Landing />}/>
          <Route path='/all' element={<SpecialistsFound/>}/>
        </Routes>
     
    </div>
  );
}

export default App;
