import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Message(){

    const userId = useContext(AuthContext);
    console.log(userId)

    const getMessages = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/user/${userId}/messages`)
    }

    return (
        <div className="Message">


        </div>
    )
}

export default Message;