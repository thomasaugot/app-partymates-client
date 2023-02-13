import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "./AllEvents.css";
import SearchBar from "../components/SearchBar";
// import AddEvent from "./AddEvent";
// import { Link } from "react-router-dom";

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
    <div>
      <div>
        {/* <SearchBar events={events}/> */}
      </div>
      {/* <div className="addEventLink">
        <h5 className="addEventLink">Can't find an event you are looking for?</h5>
        <Link className="addEventLinkBtn" to="/events/create">Add it here</Link>
      </div> */}
      <div className="AllEvents">
        {events.map((eventObj) => (
          <EventCard key={eventObj._id} {...eventObj} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
