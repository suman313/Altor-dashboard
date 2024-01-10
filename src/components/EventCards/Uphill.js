import React, { useState } from 'react'
// import uphill from "../../assets/eventCards/uphill.svg"
// import './uphill.css'
import uphill from '../../assets/eventCards/uphill.svg'
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
    <div class="flex flex-col justify-between items-center gap-5  py-5 rounded-[17px] bg-opacity-25 shadow-lg  shadow-[rgba(132,132,132,0.21)]" onClick={handleShow}>
    <div class="">
      <img src={icon} alt="uphill" />
      </div>
    <p>{cardText}</p>
  </div>
  )
}

export default Uphill