import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function ReplyForm(props) {
  const [content, setContent] = useState("");
  const [stateMessage, setStateMessage] = useState(null)
  const recipient = props.recipient;
  const creator = useContext(AuthContext);

  console.log("this is the creator", props)

  const handleSubmit = (event) => {
    event && event.preventDefault();

    const requestBody = { content, recipient, creator: creator.user._id }; // no need to store the creator id since backend does it already
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/messages`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setContent("")
        setStateMessage("Sent!")
        return 
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="replyCard">
      <form className="sendMessageCard" onSubmit={handleSubmit}>
        <label className="msgTitle">Write a message</label>
        <div className="borderFormProfile">
          <textarea
            type="text"
            rows="2"
            cols="26"
            class="textareaCard"
            name="description"
            placeholder="Write your message here"
            value={content}
            style={{ boxSizing: "borderBox", width: "100%" }}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div style={{fontSize: "1.8vw"}}>{stateMessage}</div>
        <button className="addBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ReplyForm;
