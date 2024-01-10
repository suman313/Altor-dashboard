import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import Timer from "../Timer/Timer";
import { backEndUrl } from "../../DefineUrls";

function EventModal({
  show,
  setShowEventModal,
  eventType,
  rideStarted,
  description,
}) {
  const [token, setToken] = useState("");
  const [startEvent, setStartEvent] = useState(new Date());
  const [stopEvent, setStopEvent] = useState(new Date());
  const [eventStarted, setEventStarted] = useState(false);
  const [eventStopped, setEventStopped] = useState(false);
  const [msg, setMsg] = useState("Event Not Started yet.");
  const [forTimer, setForTimer] = useState(false);

  const handleClose = () => {
    if (eventStarted) {
      handleEventStop();
      setShowEventModal(false);
    } else {
      setShowEventModal(false);
    }
  };

  const handleEventStart = async () => {
    if (!rideStarted) {
      alert("You have to start the ride first!");
      return;
    }
    setEventStarted(true);
    setStartEvent(Date.now());
    setForTimer(true);
  };

  const handleEventStop = async () => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/get_event_cycle`,
        {
          event_type: eventType,
          start_time: startEvent,
          end_time: Date.now(),
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      // setReRender((prev) => !prev);
      alert(data.message);
      setEventStarted(false);
      setShowEventModal(false);
      console.log(data); // Handle the response data
      setForTimer(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setShowEventModal(false);
      // Handle any error that occurs during the request
    }
  };
  return (
    <>
      <Modal show={show} onClose={handleClose}>
        <div className="flex flex-col gap-10 p-5">
          <div className="relative">
            <h1 className="text-[#636363] text-[2rem] text-center">
              {eventType}
            </h1>
            <button className="absolute top-0 right-3" onClick={handleClose}>
              X
            </button>
          </div>

          <p className="mx-5 justify-center">{description}</p>
          <div className="flex justify-between items-center w-full">
            <button
              className="bg-[#00BD4C] text-white rounded-[42px] font-bold pt-2 pb-2 pl-5 pr-5 w-[12rem] disabled:opacity-75"
              onClick={handleEventStart}
              disabled={eventStarted}
            >
              Start
            </button>
            {/* <div>{`${hours}:${minutes}:${seconds}`}</div> */}
            <Timer forTimer={forTimer} />
            <button
              className="bg-[#FF2E00] text-white rounded-[42px] font-bold pt-2 pb-2 pl-5 pr-5 w-[12rem]"
              onClick={handleEventStop}
              disabled={eventStopped}
            >
              Stop
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EventModal;
