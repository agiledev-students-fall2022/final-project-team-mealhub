import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ProfilePage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditImage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", selectedImage);
        console.log(formData);
        axios.post(`${process.env.REACT_APP_URL}/uploadImage`, formData, {
            headers: { Authorization: `JWT ${jwtToken}` },
        });
        navigate("/profilePage");
    };

    return (
        <div id="changeImage">
            <h1>Change Profile Image</h1>
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"150px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>
                        Remove
                    </button>
                </div>
            )}
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <input type="submit" value="Save" />
            </form>
            <br></br>
            <br></br>
            <Button href={"/profilePage"} variant="secondary">
                Done
            </Button>{" "}
        </div>
    );
}

export default EditImage;
