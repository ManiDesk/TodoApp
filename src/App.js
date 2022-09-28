//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Reset from './components/auth/Reset';
import Favourite from './components/favourite';
import ImportantTask from './components/ImportantTask';
import Addusertask from './components/auth/addUser';
import Userslist from './components/auth/uselist';
import PlannedTask from './components/PlannedTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CalendarDemo from './components/Calender';
function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/important" element={<ImportantTask />} />
          <Route exact path="/planned" element={<PlannedTask />} />
          <Route exact path="/addUser" element={<Addusertask />} />
          
          <Route exact path="/userlist" element={<Userslist />} />
          <Route exact path="/calender" element={<CalendarDemo />} />
          
        </Routes>
      </Router>

    </React.Fragment>
  );
}

export default App;
