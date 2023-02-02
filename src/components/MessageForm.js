import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

function MessageForm(props) {
  const [content, setContent] = useState("");
  const recipient = props.recipient;
  const creator = useContext(AuthContext);
  console.log("this is the creator", creator)

  const handleSubmit = (event) => {
    event && event.preventDefault();

    const requestBody = { content, recipient, creator: creator.user.name }; // no need to store the creator id since backend does it already
    const storedToken = localStorage.getItem("authToken");

// console.log("this is my body", requestBody)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/messages`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // console.log(response)
        setContent("")
        return <>Sent!</>
      })
      .catch((error) => console.log(error));
  };

  //so that element refreshes upon submit without reloading page
//   useEffect((event) => {
//     handleSubmit(event);
//   }, []);

  return (
    <div>
      <form className="sendMessage" onSubmit={handleSubmit}>
        <label className="msgTitle">Write a message</label>
        <div className="borderForm">
          <textarea
            type="text"
            rows="2"
            cols="26"
            class="textarea"
            name="description"
            placeholder="Write your message here"
            value={content}
            style={{ boxSizing: "borderBox", width: "100%" }}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <button className="addBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default MessageForm;
