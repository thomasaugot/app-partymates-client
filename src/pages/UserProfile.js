import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import TripCard from "../components/TripCard";

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = useParams();

  const getUser = () => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, {headers: {Authorization : `Bearer ${token}` }})
      .then((response) => {
        const userDetails = response.data;
        console.log(userDetails)
        console.log(userDetails.eventsAttending)
        setUserDetails(userDetails);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="userProfile">
      {userDetails && (
        <>
          <h2>Welcome, {userDetails.name} !</h2>
          <h4>Events you are attending:</h4>
          {/* {userDetails.eventsAttending.map((event) => {
            return <div>{<EventCard />}</div>;
          })}

          <div>
            <h4>Your posts:</h4>
            {userDetails.trips.map((trip) => {
              return (
                <div>
                  <TripCard />
                </div>
              );
            })} */}
          {/* </div> */}
        </>
      )}
    </div>
  );
}

export default UserProfile;
