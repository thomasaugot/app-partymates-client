import { Link } from "react-router-dom";

function EventCard({ name, date, image, location }) {
  return (
    <div className="EventCard">
      <img src={image} alt='festival'/>
      <h2>{name}</h2>
      <h4>Date: {date}</h4>
      <h4>Location: {location}</h4>
      <Link to="/events/:eventId">More details</Link>
    </div>
  );
}

export default EventCard;
