import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditTrip.css";

function EditTrip(props) {
  const [description, setDescription] = useState("");

  const { tripId } = useParams();
  const navigate = useNavigate();
  const eventId = props.eventId;
  console.log('this is my tripID', props.tripId);
  console.log('this is my eventID', props.eventId);

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
        navigate(-1);
      });
  };

  const deleteTrip = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/trips/${tripId}`)
      .then(() => {
        navigate(-2);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3 className="editTitle">Edit your post</h3>

      <form className="editForm" onSubmit={handleFormSubmit}>
        <label>Message:</label>
        <div className="borderForm">
          <textarea
            className="textarea"
            name="description"
            rows="10"
            cols="60"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="editBtn" type="submit">
          Update
        </button>{" "}
        <button className="editBtn " onClick={deleteTrip}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
