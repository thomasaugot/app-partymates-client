function TripCard({ description, eventName}) {
    return (
        <div className="TaskCard card">
          <h3>{eventName}</h3>
          <h4>Description:</h4>
          <p>{description}</p>
        </div>
      );
}

export default TripCard;