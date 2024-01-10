import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import Select from "react-select/creatable";
import Loder from "../Loder";
import { backEndUrl } from "../../DefineUrls";

function TagInputModal({ show, setShow, riderName, mapOptions, riderPhNo, getEventsPerRider }) {
  //collecting the data on select
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleSubmit = async () => {
    const url = `${backEndUrl}/map_events_to_rider`;
    const token = sessionStorage.getItem("token");
    // break selected Options into array of strings
    let breakselectedOptions = selectedOptions.map((ele) => ele.value);

    try {
      setLoading(true);
      const { data } = await axios.post(
        url,
        {
          rider_phone_no: riderPhNo,
          event_types: breakselectedOptions,
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
    finally {
      setLoading(false)
      handleClose();
    }
  };

  return (
    <Modal show={show} onClose={handleClose}>
      {loading ? <Loder text={"Events Tagged Successfully.."} /> :<div class="relative flex flex-col items-center  rounded-lg w-full px-[4rem] py-[4rem] gap-10">
        <span
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleClose}
        >
          Close
        </span>
        <header>
          <h1 class="text-2xl text-[#5E5E5E] font-">Tag Event to Rider</h1>
        </header>
        <div class="flex flex-col space-y-4">
          <p className="rounded-[17px] py-2 px-10">{riderName}</p>
          <Select
            isClearable
            options={mapOptions}
            isMulti
            onChange={handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <button className="create-event-btn" onClick={handleSubmit}>
          Map
        </button>
      </div> }
      
    </Modal>
  );
}

export default TagInputModal;
