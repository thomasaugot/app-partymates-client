import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "./AllEvents.css";
import SearchBar from "../components/SearchBar";
// import AddEvent from "../components/AddEvent";

function AllEvents() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div >
      <div>
        <SearchBar />
      </div>
      <div className="AllEvents">
        {/* <h3>Can't find an event you are looking for? Add it</h3>
      <AddEvent refreshEvents={getAllEvents} /> */}
        {events.map((eventObj) => (
          <EventCard key={eventObj._id} {...eventObj} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
