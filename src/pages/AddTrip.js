import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddTrip(props) {
  const [description, setDescription] = useState("");
  const {eventId} = useParams();
    
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = { description, eventId }; // no need to store the creator id since backend does it already
    const storedToken = localStorage.getItem("authToken");
    console.log(requestBody);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        // Resets the state of the form
        setDescription("");
        props.refreshTrips();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTrip">
      <form onSubmit={handleSubmit}>
        <label>Post a trip below</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default AddTrip;
