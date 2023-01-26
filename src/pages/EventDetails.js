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
      {event && (
        <>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
        </>
      )}

      {event &&
        event.tripsOrganized.map((trip) => (
          <TripCard key={trip._id} {...trip} />
        ))}

      <Link to="/events">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default EventDetails;
