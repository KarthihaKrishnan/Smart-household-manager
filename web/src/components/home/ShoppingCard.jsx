import { useState } from 'react'

function ShoppingCard() {

  return (
    <div className="shopping-card-container">
      <div className='shopping-card-header'>
        <h3 className='shopping-card-title'>
          Shopping List
          <span className='arrow'>&gt;</span> 
        </h3>
      </div>

      <div className='shopping-card-body'>
          What do we need to buy?
      </div>

      <div className='shopping-card-primary-action'>
        <button>+ Add</button>
      </div>
    </div>
  );
}

export default ShoppingCard;