import './App.css';
//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//pages
import Home from './pages/Home';
import Kurse from './semesterPages/Kurse';
import Bibliothek from './pages/Bibliothek';
import Planer from './pages/Planer';
import Einstellungen from './pages/Einstellungen';
import Profil from './pages/Profil';
import Auth from './pages/Auth';
import Create from './pages/Create';
import Saved from './pages/Saved';
import Mensa from './pages/Mensa';
import Impressum from './pages/Impressum';
//helpers
import BibList from './helpers/BibList';
import Kalender from './helpers/Kalender';
import Stundenplan from './helpers/Stundenplan';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import News from './components/Newsanzeige';
//semesterPages
import Semester1 from './semesterPages/Semester1';
import Semester2 from './semesterPages/Semester2';
import Semester3 from './semesterPages/Semester3';
import Semester4 from './semesterPages/Semester4';
import Semester5 from './semesterPages/Semester5';
import Semester6 from './semesterPages/Semester6';





function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact element={<Home/>} />
          <Route path='/Planer' exact element={<Planer/>} />
          <Route path='/Bibliothek' exact element={<Bibliothek/>} />
          <Route path='/Profil' exact element={<Profil/>} />
          <Route path='/BibList' exact element={<BibList/>} />
          <Route path='/Auth' exact element={<Auth/>} />
          <Route path='/Create' exact element={<Create/>} />
          <Route path='/Saved' exact element={<Saved/>} />
          <Route path='/Kalender' exact element={<Kalender/>} />
          <Route path='/Stundenplan' exact element={<Stundenplan/>} />
          <Route path='/Kurse' exact element={<Kurse/>} />
          <Route path='/Mensa' exact element={<Mensa/>} />
          <Route path='/News' exact element={<News/>} />
          <Route path='/Impressum' exact element={<Impressum/>} />
          <Route path='/Semester1' exact element={<Semester1/>} />
          <Route path='/Semester2' exact element={<Semester2/>} />
          <Route path='/Semester3' exact element={<Semester3/>} />
          <Route path='/Semester4' exact element={<Semester4/>} />
          <Route path='/Semester5' exact element={<Semester5/>} />
          <Route path='/Semester6' exact element={<Semester6/>} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
