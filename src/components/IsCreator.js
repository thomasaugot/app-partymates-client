import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function IsCreator({ children }) {
  const { storedToken } = useContext(AuthContext);

  const currenUserId = req.session.loggedUser._id;
  const { tripId } = useParams();

  const creatorId = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((tripObj) => {
        console.log(tripObj);
        return tripObj.creator;
      })
      .catch((error) => {
        console.log("error retrieving trip creator's ID");
      });
  };

  if (currenUserId.toString() !== creatorId.toString()) {
    return true;
  } else {
    return false;
  }
}

export default IsCreator;
