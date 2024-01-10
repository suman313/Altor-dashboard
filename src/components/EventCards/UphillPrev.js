import React, { useState } from 'react'
// import uphill from "../../assets/eventCards/uphill.svg"
import './uphill.css'

function Uphill({icon, cardText, description, show, setShowEventModal, setEventType, setEventDescription}) {

  const handleShow = () => {
    setEventType(cardText);
    setEventDescription(description)
    setShowEventModal(true);
  }

  let iconHeight = 'auto';
  if(cardText == 'Walking') {
    iconHeight = '37px'
  }

  return (
    <div class="flex justify-between items-center py-4 px-[4rem] event-design" >
    <div class="">{cardText}</div>
    <button className='bg-[#000000] rounded-[17px] text-white text-[1rem] px-10 py-1' onClick={handleShow}>start tracking</button>
  </div>
  )
}

export default Uphill