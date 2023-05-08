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
}

export default App;
