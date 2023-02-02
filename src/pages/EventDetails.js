import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AttendeesList from "../components/AttendeesList";
import TripCard from "../components/TripCard";
import { AuthContext } from "../context/auth.context";
import "./EventDetails.css";

function EventDetails() {
  const { user } = useContext(AuthContext)
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const [isGoing, setIsGoing] = useState(false)

  const getEvent = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/events/${eventId}`)
      .then((response) => {
        const eventObj = response.data;

        const going =  eventObj.attendees?.find((e) => e._id === user._id)
    
        setIsGoing(() => {
          if (going) return true
        })
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
            <img src={event.image} alt="festival" className="EventDetailsImg" />
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
      <div>
        <AttendeesList event={eventId} eventDetails={event} isGoing={isGoing} />
      </div>
        <div>
          <Link
            className="offerRideBtn"
            to={`/events/${eventId}/share-your-trip`}
          >
            Offer a Ride
          </Link>
        </div>
        <h4 className="textRides">They might be looking for you:</h4>
        <div>
          {event &&
            event?.tripsOrganized?.map((trip) => {
              return (
                <div>
                  <TripCard
                    creationDate={trip.createdAt}
                    tripId={trip._id}
                    creatorName={trip.creator.name}
                    creatorId={trip.creator._id}
                    tripMessage={trip.description}
                    key={trip._id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
