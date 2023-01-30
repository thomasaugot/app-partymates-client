import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TripCard from "../components/TripCard";
import "./EventDetails.css";

function EventDetails() {
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
      <div className="firstColumn">
        {event && (
          <>
            <img src={event.image} alt="festival" />
            <h2>{event.name}</h2>
            <h4>Date: {event.date}</h4>
            <h4>Location: {event.location}</h4>
            <p>{event.description}</p>
            <h4>
              <a
                className="detailsLink"
                target="_blank"
                rel="noreferrer"
                href={event.linkToTickets}
              >
                Get your tickets
              </a>
            </h4>

            {/* <button className="detailsLink" onClick={}>I'm Going</button>
            <h4>{event.attendees} are going to this event</h4> */}
          </>
        )}
        <Link to="/events">
          <button>Back</button>
        </Link>
      </div>
      <div className="secondColumn">
        <div className="detailsLink">
          <Link className="textBtn" to={`/events/${eventId}/share-your-trip`}>
            Want to share a ride? Click here.
          </Link>
        </div>
        <h4 className="textRides">They might be looking for you:</h4>
        <div>
          {event &&
            event.tripsOrganized.map((trip) => {
              return (
                <div>
                  <TripCard tripId={trip._id} key={trip._id} {...trip} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
