import React from 'react'
import Cycle from "../../assets/information-card/cycle.svg"
import './cardInfo.css'

function CardInfo({image, aboutText, qty}) {
  return (
    <div className='cardInfo'>
      <div className='cardInfo-image'>
        <img src={image} alt="cycle" />
      </div>
      <div className='cardInfo-info'>
        <p className='cardInfo-info-total'>{aboutText}</p>
        <p className='cardInfo-info-number'>{qty}</p>
      </div>
    </div>
  )
}

export default CardInfo