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
          <div className="carousel">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Accordion Item #3</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="profileContent">
              <div>
                <h4>Events you are attending:</h4>
                {userDetails.eventsAttending.map((event) => {
                  return <div className="cardsProfile">{<EventCard />}</div>;
                })}
              </div>

              <div className="carousel">
                <h4>Your posts:</h4>
                {userDetails.trips.map((trip) => {
                  return (
                    <div className="cardsProfile">
                      <TripCard />
                    </div>
                  );
                })}
              </div>

              <div>
                <h4>Your inbox:</h4>
                <Message />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
  <script
    src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
    crossorigin
  ></script>;
}

export default UserProfile;
