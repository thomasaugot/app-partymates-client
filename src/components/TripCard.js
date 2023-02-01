import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./TripCard.css";
import dayjs from "dayjs";

function TripCard(props) {
  const { tripId, eventId } = useParams();
  const { user } = useContext(AuthContext);

  console.log(props);

  return (
    <div className="tripCardEventDetails">
      <h4 className="tripCardEventDetailsH4">By {props.creator}</h4>
      <h4 className="tripCardEventDetailsH4">Message:</h4>
      <p className="tripCardEventDetailsP">{props.description}</p>
      <p>Posted on {dayjs(props.createdAt).format("MMM D, YYYY h:mm A")}</p>
      {props.creator === user?._id && (
        <Link
          className="editBtn"
          to={`/events/${eventId}/share-your-trip/${props.tripId}/edit`}
        >
          Edit post
        </Link>
      )}
      {props.creator !== user?._id && (
        <Link tripId={tripId} user={user} to={"/message"} className="sendMessageBtn">
          Send a Message
        </Link>
      )}
    </div>
  );
}

export default TripCard;
