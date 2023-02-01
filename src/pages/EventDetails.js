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
  const [goingNotGoing, setgoingNotGoing] = useState("Going");
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
        document.location.reload();
        console.log("User added to events' attendees");
      })
      .catch((error) => console.log("error adding user"));
  };

  const addEventToUser = () => {
    if (!user) {
      Navigate(`/login`);
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}/events`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Event added to user profile");
      })
      .catch((error) => console.log("error adding user"));
  };

  useEffect(() => {
    getEvent();
  }, []);

  // console.log(event.attendees);
  // console.log(user._id);

  const goingToEvent = () => {
    event.attendees.includes(user._id);
  };

  //conditional rendering line 116
  const attendeesListText = () => {
    if (event?.attendees?.length === 0) {
      return <>Be the first joining the event</>;
    } else if (event?.attendees?.length === 1) {
      return <>is joining the event</>;
    } else {
      return <>are going to this event</>;
    }
  };

  return (
    <div className="EventDetails">
      <div className="firstColumn">
        {event && (
          <>
            <img src={event.image} alt="festival" className="EventDetailsImg"/>
            <h2 className="eventDetailsH2">{event.name}</h2>
            <h4>Date: {event.date}</h4>
            <h4>Location: {event.location}</h4>
            <p className="EventDetailsP">{event.description}</p>
            <h4>
              <a
                className="blueButton"
                target="_blank"
                rel="noreferrer"
                href={event.linkToTickets}
              >
                Get your tickets
              </a>
            </h4>
          </>
        )}
        <div>
          <Link to="/events">
            <button className="backLink">Back</button>
          </Link>
        </div>
      </div>
      <div className="secondColumn">
        <div className="buttonsGoPost">
          {goingToEvent && (
            <>
              <button onClick={addAttendee} className="blueButton">
                I'm Going
              </button>
            </>
          )}

          {!goingToEvent && (
            <>
              <button onClick={addAttendee} className="transparentBtn">I'm Going</button>
            </>
          )}
          <div>
            <Link className="offerRideBtn" to={`/events/${eventId}/share-your-trip`}>Offer a Ride</Link>
          </div>
        </div>
        <h4 className="eventDetailsH4">
          {event &&
            event?.attendees?.map((user) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`profile/${user._id}`}
                >
                  <>{user.name} </>
                </Link>
              );
            })}
          {attendeesListText()}
        </h4>
        <h4 className="textRides">They might be looking for you:</h4>
        <div>
          {event &&
            event?.tripsOrganized?.map((trip) => {
              return (
                <div>
                  <TripCard creationDate={trip.createdAt} tripId={trip._id} creatorName={trip.creator.name} creatorId={trip.creator._id} tripMessage={trip.description} key={trip._id} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
