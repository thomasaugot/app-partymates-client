import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IsAnon from "./components/IsAnon";


function App() {
  return (
    <div className="App">
      <img src="/images/logo.jpg" alt="logo" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
      </Routes>
    </div>
  );
}

export default App;
