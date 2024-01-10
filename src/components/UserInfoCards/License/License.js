import React from 'react'
import './license.css'

import license from "../../../assets/userInfoCard/liscense.svg"

function License() {
  return (
    <button class="profile-card-info-card-license">
      <img class="vector-icon" alt="" src={license} />

      <b class="rider_license">
        <p class="licensed">Licensed</p>
        <p class="licensed">Rider</p>
      </b>
    </button>
  )
}

export default License