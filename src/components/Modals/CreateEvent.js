import { Modal } from "flowbite-react";
import React, { useState } from "react";
import "./createEvent.css";
import axios from "axios";
import "./cssforCreatebtn.css"
import Loder from "../Loder";
import { backEndUrl } from "../../DefineUrls";

function CreateEvent({ showCreateEvent, setShowCreateEvent }) {
  const [loading , setLoading] = useState(false);
  
  const handleClose = () => {
    setShowCreateEvent(false);
  };
  const postData = async (ev, des) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${backEndUrl}/create_event`,
        {
          event_type: ev,
          description: des,
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
    finally {
      setLoading(false)
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let event = e.target.elements.event_type.value 
    let description = e.target.elements.description.value;
    postData(event, description);
  };

  return (
    <Modal show={showCreateEvent} >
      {loading ? <Loder text={"Event Created Successfully.."}/> : <div class="relative flex flex-col items-center  rounded-lg w-full px-[4rem] py-[4rem] gap-10">
        <span
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleClose}
        >
          Close
        </span>
        <header>
          <h1 class="text-2xl text-[#5E5E5E]">Create Event</h1>
        </header>
        <form onSubmit={handleSubmit}>
        <div class="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter event type"
            className="rounded-[17px] py-2 px-10 "
            name="event_type" />
          <input
            type="text"
            placeholder="Enter event description"
            className="rounded-[17px] py-2 px-10"
            name="description"/>
        </div>
        <button type="submit" className="create-btn" >
          Create Event
        </button>
        </form>
      </div>}
      
    </Modal>
  );
}

export default CreateEvent;
