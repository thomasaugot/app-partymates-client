import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import service from "../api/service";

function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg"
  );
  const userId = useParams();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const uploadImage = (file) => {
     axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, file)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageURL", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        console.log("This is the image url");
        console.log("response is === ", response.imageURL);
        setImageUrl(response.imageURL);
      })
      .catch((error) => {
        console.log("Error while uploading the file: ", error);
      });
  };

  return (
    <div>
      <h2>Upload a picture</h2>
      <form onSubmit={uploadImage}>
        <input
          type="file"
          name="imageUrl"
          onChange={handleFileUpload}
          style={{ borderRadius: "10px", padding: "10px 20px" }}
        />
        {isUploadingImage ? (
          <button type="submit" disabled>
            Uploading...
          </button>
        ) : (
          <button type="submit">Create</button>
        )}
      </form>
    </div>
  );
}

export default ProfilePicture;
