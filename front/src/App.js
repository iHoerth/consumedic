import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/landing' element={<Landing />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
