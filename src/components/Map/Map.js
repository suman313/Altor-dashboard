import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map(){
  const defaultProps = {
    center: {
      lat:22.5726,
      lng: 88.3639
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%', overflow:"hidden", borderRadius:"42px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBNR5T623AR8ThhGKhhwhKBTZqVrPCg8b0" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        margin={[50,50,50,50]}
        options={''}

      >
      </GoogleMapReact>
     </div>
  );
}