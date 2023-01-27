import axios from "axios";
import { useState } from "react";

function AddEvent(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [linkToTickets, setLinkToTickets] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, description };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Resets the state
        setName("");
        setDescription("");
        props.refreshEvents();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddEvent">

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Link to tickets:</label>
        <input
          type="text"
          name="linkToTickets"
          value={linkToTickets}
          onChange={(e) => setLinkToTickets(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default AddEvent;
