import axios from "axios";
import { AuthContext } from "../context/auth.context";

const api = axios.create({
  baseURL: "http://localhost:5005/api",
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api
    .post(`/users/upload`, file)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default uploadImage;
