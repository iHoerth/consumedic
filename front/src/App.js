<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import { Home, Landing } from './views';
import "./App.css";

function App() {
  return ( <Routes>
    <Route path="/" element={<Landing/>} />
    <Route
      path="/home"
      element={<Home/>}
      
    />
    
  </Routes>)
=======
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
>>>>>>> c43855b5f8b04016e699f584f7d0e6bea699c158
}

export default App;
