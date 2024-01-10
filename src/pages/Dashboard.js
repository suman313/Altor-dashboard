import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./dashboard.css";
import CardInfo from "../components/CardInfo/CardInfo";
import Cycle from "../assets/information-card/cycle.svg";
import Event from "../assets/information-card/events.svg";
import rider from "../assets/information-card/rides.svg";
import add from "../assets/add.svg";
import Button from "../components/Button/Button";
import Map from "../components/Map/Map";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateEvent from "../components/Modals/CreateEvent";
import OnboardModal from "../components/Modals/OnboardModal";
import { backEndUrl } from "../DefineUrls";

function Dashboard({socket}) {
  const [allRidersList, setAllRidersList] = useState([]);
  const [allEvents, setAllEvents ] = useState([])
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showOnboardModal, setShowOnBoardModal] = useState(false);
  const [totalRiders, setTotalRiders] = useState(0);
  const [totalEvents, setTotalEvents] = useState(5);
  const [totalRides, setTotalRides] = useState(5);


  const getRiderList = async () => {
    const url = `${backEndUrl}/get_all_events_all_riders`;
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.post(
        url,
        {
          role: sessionStorage.getItem("role"),
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      if(data.message === "token is invalid") {
        alert("Your session is out. Please head back to login")
        sessionStorage.clear();
        navigate('/login')
      }
      setAllRidersList(data.events);
      setTotalRiders(data.events.length);
      let eventCount = 0;
      let rideCount = 0;
      data.events.map((ride) => (rideCount = ride.total_rides + rideCount));
      setTotalRides(rideCount);
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const getAllRiderEvents = async () => {
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
            "x-access-tokens": token,
          },
        }
      );
      console.log(data)
      setTotalEvents(data.response.event_list.length)
      setAllEvents([...data.response.event_list])
  }
  catch (error) {
    console.log(error)
  }
}

  const handleNavigate = (ph) => {
    navigate(`/userinterface/${ph}`);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/login");
    }

    setRole(sessionStorage.getItem("role"));
    getRiderList();
    getAllRiderEvents()
  }, [showOnboardModal, showCreateEvent]);

  return (
    <>
      <OnboardModal
        showOnboardModal={showOnboardModal}
        setShowOnBoardModal={setShowOnBoardModal}
      />
      <CreateEvent
        showCreateEvent={showCreateEvent}
        setShowCreateEvent={setShowCreateEvent}
      />
      <Layout>
        <div className="dashboard-grid">
          {/* <div className='dashboard-left'>
               
            </div> */}
          <CardInfo image={Cycle} aboutText="Total Riders" qty={totalRiders} />
          <CardInfo image={Event} aboutText="Total Events" qty={totalEvents} />
          <CardInfo image={rider} aboutText="Total Rides" qty={totalRides} />
          <div className="dashboard-right">
            <Map />
          </div>
          <div className="rider-onboard">
            <p>Riders</p>
            {role === "admin" && (
              <button
                type="submit"
                className="flex justify-between items-center bg-[#0F0B1F] rounded-full text-azure px-6 py-2 border-none  cursor-pointer"
                onClick={() => setShowOnBoardModal(true)}
              >
                <img src={add} alt="add" className="h-[1.2rem] w-[2rem]" />
                <p className="font-medium text-white text-base">Onboard Rider</p>
              </button>
            )}
          </div>
          {/* <div className="table">
          <table>
            <thead>
              <tr>
                <td>Rider</td>
                <td>Status</td>
                <td>Riding hours</td>
                <td>Events Assigned</td>
              </tr>
            </thead>
            <tbody>
              {allEvents?.map((event) => (
                <tr onClick={() => handleNavigate(event?.rider_phone_no)}>
                  <td>
                    <div id="user-info-with-model">
                      <p className="user-info-with-model-name">{event?.rider_name}</p>
                      <p className="user-info-with-model-vehicle">
                        Honda active 125
                      </p>
                    </div>
                  </td>

                  <td>
                    <Button />
                  </td>
                  <td>{event?.riding_hours}</td>
                  <td>{event?.event_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div className="table-container">
          <div class="table">
            <div class="table-row">
              <div className="table-cell text-lg font-bold">Rider</div>
              <div className="table-cell text-lg font-bold">Status</div>
              <div className="table-cell text-lg font-bold">Riding hours</div>
              <div className="table-cell text-lg font-bold">Events Assigned</div>
            </div>
            {allRidersList?.map((event) => (
              <div
                class="table-row  dashboard-list"
                onClick={() => handleNavigate(event?.rider_phone_no)}
              >
                <div class="table-cell text-gray-700 text-lg font-semibold">{event?.rider_name}</div>
                <div class="table-cell">
                  <Button  socket={socket} phone_no={event?.rider_phone_no}/>
                </div>
                <div class="table-cell">{event?.riding_hours}</div>
                <div class="table-cell">{event?.event_count}</div>
              </div>
            ))}
          </div>
          </div>
          <div className="event-panel">
            <div className="event-panel-header">
              <p className="event-panel-header-text">Events</p>
              {role == "admin" && (
                <button
                  type="submit"
                  className="flex justify-center items-center bg-[#0F0B1F] rounded-full text-azure px-6 py-2 border-none gap-2 text-sm cursor-pointer"
                  onClick={() => setShowCreateEvent(true)}
                >
                  <img
                    src={add}
                    alt="add"
                    style={{ maxWidth: "20px", marginTop: "5px" }}
                  />
                  <p className="font-normal text-white text-sm">Create Event</p>
                </button>
              )}
            </div>
            <div className="event-panel-table">
            <div class="table">
            {allEvents?.map((event) => (
              <div
                class="event-panel-list flex justify-start"
              >
                <div class="table-cell text-gray-700 text-lg font-semibold">{event}</div>
                
              </div>
            ))}
          </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
