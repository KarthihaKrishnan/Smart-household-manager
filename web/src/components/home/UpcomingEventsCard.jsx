import { useState } from 'react'

function UpcomingEventsCard() {

  return (
    <div className="upcoming-events-card-container">
      <div className='upcoming-events-card-header'>
        <h3 className='upcoming-events-card-title'>
          Upcoming Events
          <span className='arrow'>&gt;</span> 
        </h3>
      </div>

      <div className='upcoming-events-card-body'>
          What’s your plan today?
      </div>

      <div className='upcoming-events-card-primary-action'>
        <button>+ Create</button>
      </div>
    </div>
  );
}

export default UpcomingEventsCard;