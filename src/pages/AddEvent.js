import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEvent.css";

function AddEvent(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [linkToTickets, setLinkToTickets] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, date, image, location, description, linkToTickets };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Resets the state
        setName("");
        setDescription("");
        navigate(-1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddEventPage">
      <form onSubmit={handleSubmit} className="addForm">
        <label>Name:</label>
        <input className="borderForm"
          type="text"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Image:</label>
        <input className="borderForm"
          type="text"
          name="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Date:</label>
        <input className="borderForm"
          type="text"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Location:</label>
        <input className="borderForm"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Description:</label>
        <textarea className="borderForm"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Link to tickets:</label>
        <input className="borderForm"
          type="text"
          name="linkToTickets"
          value={linkToTickets}
          onChange={(e) => setLinkToTickets(e.target.value)}
        />

        <button className="addBtn" type="submit">Submit</button>
      </form>
    </div>
  );
}
export default AddEvent;
