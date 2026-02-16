import { useState } from 'react'

function MealPlanCard() {

  return (
    <div className="meal-plan-card-container">
      <div className='meal-plan-card-header'>
        <h3 className='meal-plan-card-title'>
          Today's Meal Plan
          <span className='arrow'>&gt;</span> 
        </h3>
      </div>

      <div className='meal-plan-card-body'>
          What do we need to cook today?
      </div>

      <div className='meal-plan-card-primary-action'>
        <button>+ Add</button>
      </div>
    </div>
  );
}

export default MealPlanCard;