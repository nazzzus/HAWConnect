import React  from 'react'
import { Link } from 'react-router-dom'
import { PlanerList } from '../helpers/PlanerList'
import PlanItem from '../components/PlanItem'
import '../styles/Planer.css'
import BannerImage from '../assets/planerBanner.png'



function Planer() {
  return (
    <div className='planerMain'>
      <div className='planerTitle' style={{ backgroundImage: `url(${BannerImage})` }}>
      <h1>Dein Planer</h1>
      <h2>Nutze den Planer, um dir dein Studium gut zu organisieren.</h2>
        </div>
      <div className='planerList'>
        {
          PlanerList.map((planItem, key) => {
            return(
              <Link to={planItem.path} key={key}>
              <PlanItem
                image={planItem.image} 
                name={planItem.name} 
                text={planItem.text}
              />
            </Link>
            );
          })
        }
      </div>
    </div>
  )
}

export default Planer