import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "./AllEvents.css";
import SearchBar from "../components/SearchBar";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const filteredEvents = events.filter((eventObj) => {
    return eventObj?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="search__bar__section">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="AllEvents">
        {filteredEvents.map((eventObj) => (
          <EventCard key={eventObj._id} {...eventObj} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
