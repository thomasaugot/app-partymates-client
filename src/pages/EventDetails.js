import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import TripCard from "../components/TripCard";
import { AuthContext } from "../context/auth.context";
import "./EventDetails.css";

function EventDetails() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  const getEvent = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`)
      .then((response) => {
        const eventObj = response.data;
        setEvent(eventObj);
      })
      .catch((error) => console.log(error));
  };

  // adds user to attendees list of the event
  const addAttendee = () => {

    if (!user) {
      Navigate(`/login`);
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${event._id}/join`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("User added to events' attendees");
      })
      .catch((error) => console.log("error adding user"));
  };

  useEffect(() => {
    getEvent();
  }, []);

  const attendeesList = () => {
    event.attendees.map((user) => {
      console.log(user)
      return (
        <>
          {user.name}
        </>
      )
    })
  }



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

            <button className="detailsLink" onClick={addAttendee}>
              I'm Going
            </button>
            <h4>{attendeesList} are going to this event</h4> 
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
