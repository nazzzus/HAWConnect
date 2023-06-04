import React, { useEffect, useState } from 'react';
import '../styles/Mensa.css';
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

  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

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
      <h1>Mensaplan</h1>
      <h2>Für die aktuelle Woche</h2>
      <div className="main-content1">
        {Object.entries(mealGroups).map(([weekday, categoryMeals]) => (
          <div className="main-content-row1" key={weekday}>
            <div className="main-content-row-item1">
              <p>{weekdays[weekday]}</p>
            </div>
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
                          <h5>Preis: </h5>
                          <h5>{meal.price} €</h5>
                          <p>Zutaten:</p>
                          <img src={getImagePath(meal.ingredients)} alt={meal.ingredients} />
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
        ))}
      </div>
    </div>
  );
}

export default Mensa;
