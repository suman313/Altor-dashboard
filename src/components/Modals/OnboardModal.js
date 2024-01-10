import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import "./cssforCreatebtn.css";
import Loder from "../Loder";
import { backEndUrl } from "../../DefineUrls";

function OnboardModal({ showOnboardModal, setShowOnBoardModal }) {

  const [loader, setLoader] = useState(false);


  const riderOnboard = async (name, phone_no, device_type) => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${backEndUrl}/onboard_rider`,
        {
          name: name,
          phone_no: phone_no,
          role: "rider",
          device_type: device_type,
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );

      console.log(data);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
    finally {
      
      handleClose();
      setLoader(false);
    }

  };

  const handleClose = () => {
    setShowOnBoardModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = e.target.elements.name.value;
    let phone_no = e.target.elements.phone_no.value;
    let device_type = e.target.elements.device_type.value;
    riderOnboard(name, phone_no, device_type);
  };

  return (
    
    <Modal show={showOnboardModal}>
      {loader ? <Loder text={"Rider Added successfully.."} /> : <div class="relative flex flex-col items-center  rounded-lg w-full px-[4rem] py-[4rem] gap-10">
        <span
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleClose}
        >
          Close
        </span>
        <header>
          <h1 class="text-2xl text-[#5E5E5E] font-bold">Add New Rider</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter Name"
              className="rounded-[17px] py-2 px-10 "
              name="name"
            />
            <input
              type="text"
              placeholder="Enter Phone No."
              className="rounded-[17px] py-2 px-10"
              name="phone_no"
            />
            <input
              type="text"
              placeholder="Enter Device Type"
              className="rounded-[17px] py-2 px-10"
              name="device_type"
            />
          </div>
          <button type="submit" className="create-btn">
            Onboard Rider
          </button>
        </form>
      </div>}
    </Modal>
  );
}

export default OnboardModal;
