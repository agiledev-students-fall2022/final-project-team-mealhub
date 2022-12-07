import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ProfilePage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditImage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //Create a timeout function which will be used while loading data to database
    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    //Handle save
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", selectedImage);
        console.log(formData);
        axios.post(`${process.env.REACT_APP_URL}/uploadImage`, formData, {
            withCredentials: true,
        });

        setLoading(true);
        await timeout(3000);
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
            <br></br>
            <br></br>
            <div id="saving">
                <div className="saving">{loading ? "Saving..." : ""}</div>
            </div>
        </div>
    );
}

export default EditImage;
