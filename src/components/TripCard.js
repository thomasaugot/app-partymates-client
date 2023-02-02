import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./TripCard.css";
import dayjs from "dayjs";
import MessageForm from "../components/MessageForm";

function TripCard(props) {

  const { tripId, eventId } = useParams();
  const { user } = useContext(AuthContext);

  const content = props.tripMessage;

  return (
    <div className="tripCardEventDetails">
      <h4 className="tripCardEventDetailsH4">By {props.creatorName}</h4>
      <h4 className="tripCardEventDetailsH4">Message:</h4>
      <p className="tripCardEventDetailsP">{props.tripMessage}</p>
      <p>Posted on {dayjs(props.creationDate).format("MMM D, YYYY h:mm A")}</p>
      {props.creatorId === user?._id && (
        <Link to={ `/events/${eventId}/share-your-trip/${props.tripId}/edit`} state= {{content:content} }
          className="editBtn"
        >
          Edit post
        </Link>
      )}
      {props.creatorId !== user?._id && (
        <MessageForm creator={user} recipient={props.creatorId} />
      )}
    </div>
  );
}

export default TripCard;
