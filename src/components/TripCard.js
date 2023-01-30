import { Link, useParams } from "react-router-dom";
import "./TripCard.css";

function TripCard(props) {
  const { tripId, eventId } = useParams();

  return (
    <div className="tripCard">
      <h4>By {props.creator}</h4>
      <h4>Message:</h4>
      <p>{props.description}</p>
      <p>Posted on {props.createdAt}</p>
        <Link className="editBtn" to={`/events/${eventId}/share-your-trip/${props.tripId}/edit`}>
          Edit post
        </Link>
    </div>
  );
}

export default TripCard;
