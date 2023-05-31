import React, { useEffect, useState } from 'react';
import'../styles/Mensa.css'
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
  
      if (!groupedMeals[category]) {
        groupedMeals[category] = {};
      }
  
      if (!groupedMeals[category][weekday]) {
        groupedMeals[category][weekday] = [];
      }
  
      groupedMeals[category][weekday].push(meal);
    });
  
    return groupedMeals;
  };
  
  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];


  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE");
  };

  const mealGroups = groupMealsByCategory();

  return (
    <div className="main-plan1">
      <h1>Mensaplan</h1>
      <h2>Für die aktuelle Woche</h2>
      <div className="main-content1">
        {Object.entries(mealGroups).map(([category, weekMeals]) => (
          <div className="main-content-row1" key={category}>
            <div className="main-content-row-item1">
              <p>{category}</p>
            </div>
            {Object.entries(weekMeals).map(([weekday, mealsOnDay]) => (
              <div className="main-content-row-item1" key={weekday}>
                <div className="item-info1">
                  <strong>
                    <p>
                      {mealsOnDay.length > 0 ? (
                        `${formattedDate(mealsOnDay[0].datum)} (${weekdays[weekday]})`
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
                          <p>Zutaten: {meal.ingredients}</p>
                        </div>
                      ))}
                    </div>
                  ) : (<p><br /><br />Keine Gerichte an diesem Tag!</p>)}
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
