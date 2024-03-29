import './App.css';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//pages
import Home from './pages/Home';
import Kurse from './semesterPages/Kurse';
import Bibliothek from './pages/Bibliothek';
import Planer from './pages/Planer';
import Profil from './pages/Profil';
import Auth from './pages/Auth';
import Create from './pages/Create';
import Saved from './pages/Saved';
import Mensa from './pages/Mensa';
import Impressum from './pages/Impressum';
//helpers
import BibList from './helpers/BibList';
import Kalender from './components/Kalender';
import Stundenplan from './pages/Stundenplan';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import News from './components/Newsanzeige';
import CreateBook from './helpers/create-book'
import Viewbook from './helpers/view-book';
import Zitat from './helpers/Zitat';
import Task from './helpers/Tasks';

//semesterPages
import Semester1 from './semesterPages/Semester1';
import Semester2 from './semesterPages/Semester2';
import Semester3 from './semesterPages/Semester3';
import Semester4 from './semesterPages/Semester4';
import Semester5 from './semesterPages/Semester5';
import Semester6 from './semesterPages/Semester6';

//pläne
import Pruefungsplan from './pages/Pruefungsplan'

import KeineSeite from './pages/KeineSeite';
import Schedule from './helpers/Schedule';
import ProfileImages from './helpers/ProfileImages';
import Admin from './pages/Admin';
import Vorlesungsplan from './helpers/Vorlesungsplan';
import { useGetUserId } from './hooks/useGetUserId';



function App() {
  const userId = useGetUserId();

  const checkAdminRole = () => {
    const allowedAdminIds = ['64737cccd84b3dd3043587e0', '646e661262545dab523becb0', 'id3', 'id4', 'id5'];


    if (allowedAdminIds.includes(userId)) {
      return <Admin />;
    } else {
      return <Home />;
    }
  };

  const checkUserRole = () => {
    


    if (userId != null) {
      return <Bibliothek />;
    } else {
      return <Auth />;
    }
  };


  const checkUserRoleP = () => {
    if (userId != null) {
      return (
        <>
        
          <Route path='/Bibliothek' exact element={<Bibliothek />} />
          <Route path='/Profil' exact element={<Profil/>} />
          <Route path='/BibList' exact element={<BibList/>} />
          <Route path="/" element={ <Home/>} />
          <Route path="/Tasks" exact element= {<Task/>} />
          <Route path='/Vorlesungsplan' element={<Vorlesungsplan/>} />
          <Route path='/Zitat' exact element={<Zitat/>} />
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
          <Route path='/Createbook' exact element={<CreateBook/>} />
          <Route path='/Viewbook' exact element={<Viewbook/>} />
          <Route path='/Pruefungsplan' exact element={<Pruefungsplan/>} />
          <Route path='/Schedule' exact element={<Schedule/>} />
          <Route path='/Planer' exact element={<Planer/>} />
        </>
      );
    } else {
      return (
        <>
          <Route path='/Auth' exact element={<Auth />} />
          {/* Weitere Route-Komponenten für den nicht eingeloggten Benutzer */}
        </>
      );
    }
  };



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {checkUserRoleP()}
          {/* <Route path='/Bibliothek' exact element= {checkUserRole()} /> */}
          <Route path="/Auth" element={<Auth />} />
          <Route path='*' exact element={<Auth />} />
          <Route path="/admin" element={checkAdminRole()} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
