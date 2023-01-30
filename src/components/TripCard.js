import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./TripCard.css";
import dayjs from "dayjs";

function TripCard(props) {
  const { tripId, eventId } = useParams();
  const { user } = useContext(AuthContext);

  console.log(props)

  return (
    <div className="tripCard">
      <h4>By {props.creator}</h4>
      <h4>Message:</h4>
      <p>{props.description}</p>
      <p>Posted on {dayjs(props.createdAt).format("MMM D, YYYY h:mm A")}</p>
      {props.creator === user._id && (
        <Link
          className="editBtn"
          to={`/events/${eventId}/share-your-trip/${props.tripId}/edit`}
        >
          Edit post
        </Link>
      )}
    </div>
  );
}

export default TripCard;
