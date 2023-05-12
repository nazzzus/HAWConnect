import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import BannerImage from '../assets/hawBanner.png'
import '../styles/Home.css'
import '../styles/Wetter.css'
import '../styles/Todo.css'
import '../styles/Newsanzeige.css'
import axios from "axios";
import Wetter from '../helpers/Wetter'
import Todo from '../components/TodoMain'
import Newsanzeige from '../components/Newsanzeige'
import Benachrichtigung from '../components/Benachrichtigung';


function Clock() {
  const [date, setDate] = useState(new Date());
  const weekday = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className='day'>{weekday[date.getDay()]}</div>
      <div className="date">{date.toLocaleDateString()}</div>
      <div className="time">{date.toLocaleTimeString()}</div>
    </div>
  );
}



function Home() {


  return (
    <div className="home">
        <div className='headerContainer' style={{ backgroundImage: `url(${BannerImage})` }}>
            <h1>
                Willkommen auf HAWConnect <br></br>
            </h1>
            <h2>
                Plane alles rund um dein Studium!
            </h2>
            </div>
            <div className='mainContent'>
            <div className='infoAnzeige'>
              <div className='zeitAnzeige'>
               <Clock />
              </div>
              <div className="wetterAnzeige">
                <Wetter />
              </div>
            </div>
            <div className='newsAnzeige'>
              <Newsanzeige/>
            </div>
            <div className='todo'>
              <Todo />
            </div>
            <div className='benachrichtigungen'>
              <Benachrichtigung/>
            </div>
            </div>
    </div>
  )
}

export default Home