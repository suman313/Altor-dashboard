
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserInterface from './pages/UserInterface';
import "./global.css"
import Login from "./pages/Login";
import { io } from 'socket.io-client';
import { backEndUrl } from "./DefineUrls";

//use the socket.io-client module to create a Socket object that connects to the url: http://0.0.0.0:5000

const socket = io.connect(`${backEndUrl}`);


function App() {
  return (
<Routes>
      
      <Route path="/" element={<Dashboard socket={socket}/>} />
      <Route path="/userinterface/:ph" element={<UserInterface />} />
      <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;
