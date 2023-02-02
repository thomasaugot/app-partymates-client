import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import TripCard from "../components/TripCard";
import service from "../api/service";
import "../pages/userProfile.css";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import ReplyForm from "../components/ReplyForm";


function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const [profilePicture, setProfilePicture] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const token = localStorage.getItem("authToken");

  // console.log(messages);

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userDetails = response.data;
        console.log(userDetails);
        // console.log(userDetails.eventsAttending);
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
        // console.log(response.data.messages);
        setMessages(response.data.messages);
      })
      .catch((error) => console.log(error));
  };

  // File upload for pofile picture
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    setIsUploadingImage(true);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setProfilePicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setIsUploadingImage(false);
      });
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
            {/* <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              style={{ borderRadius: "10px", padding: "10px 20px" }}
            />
            <img src={userDetails.profilePicture} alt="profile" width="50" /> */}
            <h2>Welcome, {userDetails.name} !</h2>
          </div>
          <div>
            <Accordion className="accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordionHeader">
                  Events you are attending
                </Accordion.Header>
                <Accordion.Body>
                  {userDetails?.eventsAttending.map((event) => {
                    {/* console.log(event) */}
                    return <div className="cardsProfile">{<EventCard />}</div>;
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Your posts</Accordion.Header>
                <Accordion.Body>
                  {userDetails?.trips?.map((trip) => {
                    console.log(userDetails)
                    console.log(trip)
                    return (
                      <div className="cardsProfile">
                        <h4 className="cardsProfileH4">@ {trip.eventName.name}</h4>
                        <p className="cardsProfileP">{trip.description}</p>
                        <h6 className="cardsProfileH6">{dayjs(trip.createdAt).format("MMM D, YYYY h:mm A")}</h6>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Your inbox</Accordion.Header>
                <Accordion.Body>
                  {messages?.map((message) => {
                    console.log('this is the message from profile',message)
                    if (userId === message.recipient) {
                      return (
                        <div className="cardsProfile">
                          From <h4 className="cardsProfileH4">{message.creator.name}</h4>
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
