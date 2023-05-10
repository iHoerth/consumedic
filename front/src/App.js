import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';

import './App.css';


function App() {

  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/landing' element={<Landing />}/>
        </Routes>
     
    </div>
  );
}

export default App;
