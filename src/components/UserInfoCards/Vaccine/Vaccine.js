import React from 'react'
import vaccine from "../../../assets/userInfoCard/vaccine.svg"
import "./vaccine.css"
function Vaccine() {
  return (
    <button class="profile-card-info-card-vaccine">
    <img class="vector-icon" alt="" src={vaccine} />

    <b class="rider_vaccine">Vaccinated</b>
  </button>
  )
}

export default Vaccine