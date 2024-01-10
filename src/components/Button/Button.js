import React, { useEffect, useState } from 'react'
import "./button.css"

function Button({socket, phone_no}) {
  const [riderStatus, setRiderStatus] = useState(1)
  console.log(socket);
  socket.on('logs/keep-me-alive/' +phone_no, event => {
    let eventStringToObject = JSON.parse(event)
    if(eventStringToObject.data[0].status == 0) {
      setRiderStatus(1)
      // console.log("inactive");
    }
    else if(eventStringToObject.data[0].status == 1) {
      setRiderStatus(2)
      // console.log("active");
    }
    else {
      setRiderStatus(3)
      // console.log("busy");
    }
  })
  // useEffect(() => {
  //   console.log('logs/keep-me-alive/' +phone_no)
  //   socket.connect();
  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     socket.disconnect();
  //   };
  // },[phone_no,socket])
  
  return (
    <button className={`status  ${riderStatus==1 ? "bg-gray-400 text-white" : riderStatus==2 ? "": "bg-red-400 text-yellow-200"}`}>{riderStatus==1 ? "Inactive" : riderStatus==2 ? "Active": "Busy"}</button>
  )
}

export default Button