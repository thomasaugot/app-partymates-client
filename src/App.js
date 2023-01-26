import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        </Routes>
    </div>
  );
}

export default App;
