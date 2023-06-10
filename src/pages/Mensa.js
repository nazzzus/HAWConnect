import React, { useEffect, useState } from 'react';
import '../styles/Mensa.css';
import BannerImage from '../assets/mensaBanner.png'
import axios from 'axios';

function Mensa() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/meals/get-meals');
        setMeals(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMeals();
  }, []);

  const groupMealsByCategory = () => {
    const groupedMeals = {};

    meals.forEach((meal) => {
      const category = meal.menu;
      const mealDate = new Date(meal.datum);
      const weekday = mealDate.getDay();

      if (!groupedMeals[weekday]) {
        groupedMeals[weekday] = {};
      }

      if (!groupedMeals[weekday][category]) {
        groupedMeals[weekday][category] = [];
      }

      groupedMeals[weekday][category].push(meal);
    });

    return groupedMeals;
  };

  const weekdays = ['Sonntag', ' M O N T A G ', ' D I E N S T A G ', ' M I T T W O C H ', ' D O N N E R S T A G ', ' F R E I T A G ', 'Samstag'];

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  };

  const getImagePath = (ingredient) => {
    switch (ingredient) {
      case 'Hähnchen':
        return require('../assets/chicken.png');
        case 'Hühnchen':
        return require('../assets/chicken.png');
      case 'Rind':
        return require('../assets/Rind.png');
      case 'Schwein':
        return require('../assets/Schwein.png');
      case 'Vegan':
        return require('../assets/Vegan.png');
      case 'Vegetarisch':
        return require('../assets/Vegetable.png');
      case 'Fisch':
        return require('../assets/fisch.png');
      default:
        return null;
    }
  };

  const mealGroups = groupMealsByCategory();

  return (
    <div className="main-plan1">
      <div className='main-plan-banner' style={{ backgroundImage: `url(${BannerImage})` }}>
      <h1>Mensaplan</h1>
      <h2>Für die aktuelle Woche</h2>
      </div>
      <div className="main-content1">
        {Object.entries(mealGroups).map(([weekday, categoryMeals]) => (
          <div key={weekday}>
            <div className="item-wochentag">
              <h1>{weekdays[weekday]}</h1>
            </div>
            <div className="main-content-row1">
              {Object.entries(categoryMeals).map(([category, mealsOnDay]) => (
                <div className="main-content-row-item1" key={category}>
                  <div className="item-info1">
                    <strong>
                      <p>
                        {mealsOnDay.length > 0 ? (
                          `${category}`
                        ) : (
                          'Keine Gerichte an diesem Tag'
                        )}
                      </p>
                    </strong>
                    {mealsOnDay.length > 0 ? (
                      <div className="meal-info1">
                        {mealsOnDay.map((meal, index) => (
                          <div className="meal1" key={index}>
                            <h3>Gericht: </h3>
                            <h4>{meal.name}</h4>
                            <h3>Preis: </h3>
                            <h5>{meal.price} €</h5>
                            <div className='image-container'>
                            <img src={getImagePath(meal.ingredients)} alt={meal.ingredients} />
                            <div className='text-overlay'> {meal.ingredients}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>
                        <br />
                        <br />
                        Keine Gerichte an diesem Tag!
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default Mensa;
