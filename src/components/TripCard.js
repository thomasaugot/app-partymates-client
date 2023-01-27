import { Link, useParams } from "react-router-dom";

function TripCard(props) {
  const { tripId, eventId } = useParams();
  console.log(tripId)
  console.log(eventId)

  return (
    <div className="TaskCard card">
      <h4>By {props.creator}</h4>
      <h4>Message:</h4>
      <p>{props.description}</p>
      <p>Posted on {props.createdAt}</p>
      <Link to={`/events/${eventId}/share-your-trip/${tripId}/edit`}>Edit post</Link>
    </div>
  );
}

export default TripCard;
