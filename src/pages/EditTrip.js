import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./EditTrip.css";

function EditTrip() {
  const [description, setDescription] = useState("");
  const location = useLocation();
  const { content } = location.state; //to be used to acces props from Link on prev. page

  console.log("these are my edit", content);
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
            defaultValue={content}
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
        </button>
        <button className="editBtn " onClick={deleteTrip}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
