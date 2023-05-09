import "./App.css";
import {Route, Switch, useLocation} from 'react-router-dom';
import Home from "./components/LandingPage";
import Userlogin from "./views/UserLoging/userlogin";
import NewUser from "./views/NewUser/newUser";
function App() {
  
  const location = useLocation();
  return( 
    <div className="App">
     <Userlogin/>
     <NewUser/>
    </div>);
}

export default App;
