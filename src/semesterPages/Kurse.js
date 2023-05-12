import React  from 'react'
import { Link } from 'react-router-dom'
import {SemesterList } from '../helpers/SemesterList'
import SemItem from '../components/SemesterItem'
import '../styles/Kurse.css'
import BannerImage from '../assets/semBanner.png'



function Kurse() {
  return (
    <div className='KurseMain'>
      <div className='KurseTitle' style={{ backgroundImage: `url(${BannerImage})` }}>
      <h1>Dein Planer für deine Semester und Kurse</h1>
      <h2>Nutze den Planer, um dir dein Studium gut zu organisieren.</h2>
        </div>
      <div className='semesterList'>
        {
          SemesterList.map((semItem, key) => {
            return(
              <Link to={semItem.path} key={key}>
              <SemItem
                title={semItem.title} 
                name={semItem.name} 
                text={semItem.text}
              />
            </Link>
            );
          })
        }
      </div>
    </div>
  )
}

export default Kurse