//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Reset from './components/auth/Reset';
import ImportantTask from './components/ImportantTask';
import PlannedTask from './components/PlannedTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import ResumeHome from './resumebuilder/components/ResumeHome';
import TestResume from './resumebuilder/components/testresume';
import ResumeHome2 from './resumebuilder/components/TestResume2';

function App(store) {
  // console.log(store);
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
          {/* <Route exact path="/resumeHome" element={<ResumeHome />} /> */}
          <Route exact path="/resumeHome" element={<ResumeHome2 />} />


        </Routes>
      </Router>

    </React.Fragment>
  );
}

export default App;
