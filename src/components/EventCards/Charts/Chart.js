import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Mqttdata } from "./chartData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { backEndUrl } from "../../../DefineUrls";

//use the socket.io-client module to create a Socket object that connects to the url: http://0.0.0.0:5000


const myData = Mqttdata.map((item) => {
  let obj1 = { x: item.a[0], y: item.a[1], z: item.a[2] };
  return obj1;
});

const Chart = () => {
  const socket = io.connect(`${backEndUrl}`);
console.log(socket);
  const { ph } = useParams();
  // Subscribe to a specific topic
  socket.on(`logs/stream-data/` + ph, (data) => {
    console.log(true);
    // Handle data received from the topic
    console.log("Received data from topicName:", data);
  });

  // useEffect(() => {
  //   console.log(ph);

  //   socket.connect();
  //   // Clean up the subscription when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [ph]);
  return (
    <div className="w-full m-5">
      <LineChart width={400} height={400} data={myData}>
        <Line type="monotone" dataKey="x" stroke="#8884d8" dot="" />
        <Line type="monotone" dataKey="y" stroke="#11D60E" dot="" />
        <Line type="monotone" dataKey="z" stroke="#983B09" dot="" />
        <XAxis />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default Chart;
