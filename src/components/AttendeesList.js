import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AttendeesList({ event, eventDetails, getEvent }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
  const [isGoing, setIsGoing] = useState(false);

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
        return axios.put(
          `${process.env.REACT_APP_SERVER_URL}/auth/profile/${user._id}/favorites/${event}`,
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
      .then((response) => {
        console.log(response.data);
        getEvent();
      })
      .catch((error) => console.log("error adding USER to EVENT"));
  };

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

  useEffect(() => {
    const going = eventDetails?.attendees?.find((e) => e._id === user._id);

    setIsGoing(() => {
      if (going) return true;
    });
  }, [eventDetails]);

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
          <button onClick={addAttendee} className="btnClicked">
            I'm Going
          </button>
        </>
      )}
      <h4 className="eventDetailsH4">
        {eventDetails &&
          eventDetails?.attendees?.map((user) => {
            return <>{user.name} </>;
          })}
        {attendeesListText()}
      </h4>
    </div>
  );
}

export default AttendeesList;
