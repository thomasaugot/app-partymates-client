function TripCard({ description, eventName, creator, _id }) {
    return (
        <div className="TaskCard card">
          <h3>{creator}</h3>
          <h4>Message:</h4>
          <p>{description}</p>
        </div>
      );
}

export default TripCard;