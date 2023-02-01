import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./TripCard.css";
import dayjs from "dayjs";
import MessageForm from "../components/MessageForm";

function TripCard(props) {
  const { tripId, eventId } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <div className="tripCardEventDetails">
      <h4 className="tripCardEventDetailsH4">By {props.creatorName}</h4>
      <h4 className="tripCardEventDetailsH4">Message:</h4>
      <p className="tripCardEventDetailsP">{props.tripMessage}</p>
      <p>Posted on {dayjs(props.creationDate).format("MMM D, YYYY h:mm A")}</p>
      {props.creatorId === user?._id && (
        <Link
          className="editBtn"
          to={`/events/${eventId}/share-your-trip/${props.tripId}/edit`}
        >
          Edit post
        </Link>
      )}
      {props.creatorId !== user?._id && (
        <MessageForm recipient={props.creatorId} />
      )}
    </div>
  );
}

export default TripCard;
