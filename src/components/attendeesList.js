import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AttendeesList({ event, eventDetails, isGoing }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
 

console.log(isGoing);


// console.log('this is my event' , event)
// console.log('this is my user', user)

// adds or removes user to attendees list of the event
  const addAttendee = () => {
    if (!user) {
      Navigate(`/login`);
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/events/${event}/join`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        // console.log("User added to events' attendees");
        // console.log(response.data);
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/profile/${user._id}/favorites/${event}`,
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      })
      .then((response) => {
        // console.log(response.data);
        // console.log("Event added to user profile");
      })
      .catch((error) => console.log("error adding USER to EVENT"));
  };


  const goingToEvent = () => {
    eventDetails.attendees.includes(user._id);
  };

  //conditional rendering line 116
  const attendeesListText = () => {
    if (eventDetails?.attendees?.length === 0) {
      return <>Be the first joining the event</>;
    } else if (eventDetails?.attendees?.length === 1) {
      return <>is joining the event</>;
    } else {
      return <>are going to this event</>;
    }
  };

  useEffect(() => {
    attendeesListText();
  }, []);

  return (
    <div className="buttonsGoPost">
      {!isGoing && (
        <>
          <button
            onClick={() => {
              addAttendee();
            }}
            className="transparentBtn"
          >
            I'm Going
          </button>
        </>
      )}

      {isGoing && (
        <>
          <button onClick={addAttendee} className="blueButton">
            I'm Going
          </button>
        </>
      )}
      <h4 className="eventDetailsH4">
        {eventDetails &&
          eventDetails?.attendees?.map((user) => {
            return (
                <>{user.name} </>
            );
          })}
        {attendeesListText()}
      </h4>
    </div>
  );
}

export default AttendeesList;
