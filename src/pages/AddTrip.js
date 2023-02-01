import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddTrip.css";

function AddTrip(props) {
  const [description, setDescription] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { description, eventId }; // no need to store the creator id since backend does it already
    const storedToken = localStorage.getItem("authToken");
    console.log(requestBody);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setDescription(""); // Resets the state of the form
        navigate(`/events/${eventId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTripPage">
      <form className="addForm" onSubmit={handleSubmit}>
        <label className="addTitle">Share your ride</label>
        <div className="borderForm">
          <textarea
            type="text"
            rows="10"
            cols="60"
            wrap="soft"
            class="textarea"
            name="description"
            placeholder="Please describe your trip, How many seats available do you have? Where will you depart from?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="addBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddTrip;
