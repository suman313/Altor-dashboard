import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./userinterface.css";
import UserImage from "../assets/userInfoCard/userImage.svg";
import Vaccine from "../components/UserInfoCards/Vaccine/Vaccine";
import License from "../components/UserInfoCards/License/License";
import Experience from "../components/UserInfoCards/Experience/Experience";
import StartBtn from "../components/Button/startButton/StartBtn";
import Uphill from "../components/EventCards/Uphill";
// images
import uphill from "../assets/eventCards/uphill.svg";
import downhill from "../assets/eventCards/downhill.svg";
import goodBreak from "../assets/eventCards/goodBreak.svg";
import hardAcceleration from "../assets/eventCards/hardAcceleration.svg";
import hardBreak from "../assets/eventCards/hardBreak.svg";
import reset from "../assets/eventCards/reset.svg";
import leftTurn from "../assets/eventCards/leftTurn.svg";
import rightTurn from "../assets/eventCards/rightTurn.svg";
import walking from "../assets/eventCards/walking.svg";
import straight from "../assets/eventCards/straightRoad.svg";
import uTurn from "../assets/eventCards/uTurn.svg";
import scooter from "../assets/scooter.svg";
import StartModal from "../components/Modals/StartModal";
import EventModal from "../components/Modals/EventModal";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Chart  from "../components/EventCards/Charts/Chart";
import { backEndUrl } from "../DefineUrls";

function UserInterface({socket}) {
  const [rideStartingTime, setRideStartingTime] = useState(new Date());
  const [rideStopTime, setRideStopTime] = useState(new Date());
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [rideStarted, setRideStarted] = useState(false);
  const [sessId, setSessId] = useState("");
  const [riderDetails, setRiderDetails] = useState({});
  const [show, setShow] = useState(false);
  const [showEventModal, setShowEventModal] = useState();
  const [openTagEventModal, setOpenTagEventModal] = useState(false);
  const [mapOptions, setMapOptions] = useState([]);
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();

  const { ph } = useParams();

  // useEffect( () => {
  //   if (sessionStorage.getItem("token") == null) {
  //     navigate("/login");
  //   }
  //   getRiderDetail();
  //   getEventsPerRider();
  // }, [openTagEventModal]);

  const getRiderDetail = async () => {
    try {
      const { data } = await axios.post(
        "http://0.0.0.0:5000/get_all_events_per_rider",
        {
          phone_no: ph,
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      if (data.message === "token is invalid") {
        alert("Your session is out. Please head back to login");
        sessionStorage.clear();
        navigate("/login");
      }
      setRiderDetails(data.response.event_list_rider);
    } catch (error) {
      console.log(error);
    }
  };

  const generateSessId = async () => {
    const url = `${backEndUrl}/generate_session_id`;
    const token = sessionStorage.getItem("token");

    try {
      const { data } = await axios.post(
        url,
        {
          phone_no: ph,
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      console.log(data.response.session_id);
      setSessId(data.response.session_id);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const getEventsPerRider = async () => {
    const url = "http://0.0.0.0:5000/get_events_per_rider";
    // const token = sessionStorage.getItem("token");
    console.log(ph.toString());
    // console.log(token)
    try {
      const { data } = await axios.get(url, {
        params: {
          phone: ph.toString(),
        },
        headers: {
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });

      // Handle the response data
      console.log(data);
      //converting array of strings to array of objects
      setEventList(data.events_list);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const getAllEvents = async () => {
    const url = `${backEndUrl}/get_all_event_types`;
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.post(
        url,
        {
          role: sessionStorage.getItem("role"),
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );

      // Handle the response data
      console.log(data);
      //converting array of strings to array of objects
      const eventList = data.response.event_list.map((ele) => ({
        value: ele,
        label: ele,
      }));
      setMapOptions(eventList);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleStart = () => {};

  const handleShow = () => {
    // generate session id
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };

  const handleMapModalShow = () => {
    setOpenTagEventModal(true);
    getAllEvents();
  };

  return (
    <>
      <StartModal
        show={show}
        handleClose={handleClose}
        handleStart={handleStart}
        setRideStarted={setRideStarted}
        sessId={sessId}
        rideStartingTime={rideStartingTime}
        setRideStartingTime={setRideStartingTime}
      />
      <EventModal
        show={showEventModal}
        setShowEventModal={setShowEventModal}
        eventType={eventType}
        description={eventDescription}
        rideStarted={rideStarted}
      />
      <Layout>
        <div className="grid grid-rows-[_0.2fr_0.8fr] gap-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="userinterface-firstPanel-first">
              <p style={{ color: "rgba(99, 99, 99, 1)", fontSize: "1.5rem" }}>
                Rider Profile
              </p>
              <div className="userinterface-firstPanel-first-userDetails">
                <img
                  src={UserImage}
                  style={{ maxWidth: "213px", maxHeight: "189px" }}
                  alt="user-image"
                />
                <div className="userinterface-firstPanel-first-userDetails-vlr">
                  <Vaccine />
                  <License />
                  <Experience />
                </div>
              </div>
              <div className="userinterface-firstPanel-first-name">
                {riderDetails?.rider_name}
              </div>
              <div className="userinterface-firstPanel-first-age">
                Age: 35 years
              </div>
              {/* <button
                className="bg-[#0F0B1F] text-white rounded-[17px] py-[0.5rem] px-[1.5rem]"
                onClick={handleMapModalShow}
              >
                Map Events
              </button> */}
            </div>
            <div className="">
              <Chart socket={socket} />
            </div>
            <div className="">
              <div className="userinterface-thirdPanel">
                <div className="vehicle">
                  <img
                    src={scooter}
                    alt="scooter"
                    style={{ maxWidth: "60%" }}
                  />
                  <div className="vehicle-description">
                    <div className="vehicle-description-name-with-model">
                      <p className="vehicle-model-name">
                        Honda Activa 125 2019
                      </p>
                      <p className="vehicle-type">Scooter</p>
                    </div>
                    <p className="vehicle-engine">125 cc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid grid-rows-[_0.2fr_0.8fr]">
            <div className="">
              <div className="flex justify-between px-10 py-6">
                <p className="text-[#636363] text-[2rem] font-semibold">
                  Events
                </p>
                <StartBtn
                  handleShow={handleShow}
                  genSessId={generateSessId}
                  rideStarted={rideStarted}
                  setRideStarted={setRideStarted}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mx-[5rem]">
              <Uphill
                icon={uphill}
                cardText={"Uphill Riding"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                 icon={downhill}
                 cardText={"Downhill Riding"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
               icon={straight}
               cardText={"Straight Road Riding"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={goodBreak}
                cardText={"Good Break"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={hardAcceleration}
                cardText={"Good Acceleration"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={hardBreak}
                cardText={"Hard Break"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={leftTurn}
                cardText={"Left Turn"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={rightTurn}
                cardText={"Right Turn"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={uTurn}
                cardText={"U-turn"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={reset}
                cardText={"Reset"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={walking}
                cardText={"Walking"}
                setEventDescription={setEventDescription}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UserInterface;
