import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import Message from "../components/Message";
import TripCard from "../components/TripCard";
import service from "../api/service";
import "../pages/userProfile.css";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = useParams();
  const [profilePicture, setProfilePicture] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const getUser = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userDetails = response.data;
        console.log(userDetails);
        console.log(userDetails.eventsAttending);
        setUserDetails(userDetails);
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
  }, []);

  return (
    <>
      {userDetails && (
        <>
          <div className="profileHeader">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              style={{ borderRadius: "10px", padding: "10px 20px" }}
            />
            <img src={userDetails.profilePicture} alt="profile" width="50" />
            <h2>Welcome, {userDetails.name} !</h2>
          </div>
          <div >
            <Accordion className="accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordionHeader">Events you are attending</Accordion.Header>
                <Accordion.Body>
                {userDetails.eventsAttending.map((event) => {
                  return <div className="cardsProfile">{<EventCard />}</div>;
                })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Your posts</Accordion.Header>
                <Accordion.Body>
                {userDetails.trips.map((trip) => {
                  return (
                    <div className="cardsProfile">
                      <TripCard />
                    </div>
                  );
                })}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Your inbox</Accordion.Header>
                <Accordion.Body>
                <Message />
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
