import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ name, date, image, location, _id }) {
  return (
    <div className="EventCard">
      <Link to={`/events/${_id}`}>
        <div>
          <img src={image} alt="festival" />
          <h2 className="eventCardTitle">{name}</h2>
          <h4 className="eventCardInfo">{date}</h4>
          <h4 className="eventCardInfo">{location}</h4>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
