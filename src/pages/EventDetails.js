import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TripCard from "../components/TripCard";

function EventDetails(props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  const getEvent = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`)
      .then((response) => {
        const eventObj = response.data;
        setEvent(eventObj);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="EventDetails">
      <div>
        {event && (
          <>
            <img src={event.image} alt="festival" />
            <h2>{event.name}</h2>
            <h4>Date: {event.date}</h4>
            <h4>Location: {event.location}</h4>
            <p>{event.description}</p>
            <h4>
            <a target="_blank" href={event.linkToTickets}>Get your tickets</a>
            </h4>

            <button>I'm Going</button>
            <h4>{event.attendees} are going to this event</h4>
          </>
        )}
      </div>
      <div>
        <h2>Looking for a ride?</h2>{" "}
        {event &&
          event.tripsOrganized.map((trip) => (
            <TripCard key={trip._id} {...trip} />
          ))}
      </div>

      <Link to="/events">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default EventDetails;
