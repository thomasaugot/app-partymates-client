import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pages/userProfile.css";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import ReplyForm from "../components/ReplyForm";
import ProfilePicture from "../components/ProfilePicture";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const token = localStorage.getItem("authToken");

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userDetails = response.data;
        setUserDetails(userDetails);
      })
      .catch((error) => console.log(error));
  };

  const getMessages = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
    getMessages();
  }, []);

  return (
    <>
      {userDetails && (
        <>
          <div className="profileHeader">
          <ProfilePicture />
            <img src={userDetails.imageUrl} alt="profilePicture" onError = {"https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg"} width="50" />
            <h2>Welcome, {userDetails?.name} !</h2>
          </div>
          <div>
            <Accordion className="accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordionHeader">
                  Events you are attending
                </Accordion.Header>
                <Accordion.Body>
                  {userDetails?.eventsAttending?.map((event) => {
                    return (
                      <div className="cardsProfile">
                        {" "}
                        <img
                          className="eventCardProfileImg"
                          src={event.image}
                          alt="festival"
                        />
                        <h2 className="eventCardProfileTitle">{event.name}</h2>
                        <h4 className="eventCardProfileInfo">{event.date}</h4>
                        <h4 className="eventCardProfileInfo">
                          {event.location}
                        </h4>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Your posts</Accordion.Header>
                <Accordion.Body>
                  {userDetails?.trips?.map((trip) => {
                    console.log(userDetails);
                    console.log(trip);
                    return (
                      <div className="cardsProfile">
                        <h4 className="cardsProfileH4">
                          @ {trip.eventName.name}
                        </h4>
                        <p className="cardsProfileP">{trip.description}</p>
                        <h6 className="cardsProfileH6">
                          {dayjs(trip.createdAt).format("MMM D, YYYY h:mm A")}
                        </h6>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Your inbox</Accordion.Header>
                <Accordion.Body>
                  {messages?.map((message) => {
                    console.log("this is the message from profile", message);
                    if (userId === message.recipient) {
                      return (
                        <div className="cardsProfile">
                          From{" "}
                          <h4 className="cardsProfileH4">
                            {message.creator.name}
                          </h4>
                          <p className="cardsProfileP">{message.content}</p>
                          <ReplyForm recipient={message.creator} />
                        </div>
                      );
                    } else if (messages.length === 0) {
                      return <>No messages yet...</>;
                    }
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      )}
    </>
  );
}

export default UserProfile;
