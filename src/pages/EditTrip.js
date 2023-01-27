import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTrip(props) {
  const [description, setDescription] = useState("");

  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/trips/${tripId}`)
      .then((response) => {
        const trip = response.data;
        setDescription(trip.description);
      })
      .catch((error) => console.log(error));
  }, [tripId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { description };

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/trips/${tripId}`,
        requestBody
      )
      .then((response) => {
        navigate(`/events/${props.eventId}`);
      });
  };

  const deleteTrip = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/trips/${tripId}`)
      .then(() => {
        navigate(`/events/${props.eventId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit your post</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={deleteTrip}>Delete</button>
    </div>
  );
}

export default EditTrip;
