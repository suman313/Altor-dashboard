import React from 'react'
import "./startBtn.css"
import axios from 'axios';
import { backEndUrl } from '../../../DefineUrls';

function StartBtn({handleShow, genSessId, rideStarted, setRideStarted}) {

  const stopRide = async() => {
    const url = `${backEndUrl}/stop_ride`;
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        url,
        {
          "rider_end_time": new Date(),
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  }

  const handleOnClick = () => {
    if(rideStarted){
      stopRide()
      setRideStarted(false)
    }
    else {
      handleShow();
      genSessId();
    }
  }
  return (
    <button className={`start-button ${rideStarted?"bg-[#b73737]":""}`} data-toggle="modal"  data-target="#startModal" onClick={handleOnClick}>
      <b className="start-button-txt">{rideStarted?"Stop": "Start"}</b>
    </button>
  )
}

export default StartBtn