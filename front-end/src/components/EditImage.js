import { useState } from "react";
import Button from "react-bootstrap/Button";

function EditImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Change Profile Image</h1>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"150px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      <br></br>
      <br></br>
      <Button href={"/profilePage"} variant="secondary">
        Done
      </Button>{" "}
    </div>
  );
}

export default EditImage;
