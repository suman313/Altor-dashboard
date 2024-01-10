import React from "react";
import { ProgressBar } from "react-loader-spinner";

function Loder({text}) {
  return (
    <div className="flex flex-col justify-center items-center py-10 gap-3">
      <p>{text}</p>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#F4442E"
        barColor="#51E5FF"
      />
    </div>
  );
}

export default Loder;
