import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavbarComponent from "../components/ProfileNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");

    //WILL BE USED WHEN DATABASE IS INTEGRATED
    //const [cuisinePreferences, setCusinePreferences] = useState([]);
    const [cuisinePreferences, setCusinePreferences] = useState("");

    //-------------------render profile data onto the page-------------------------
    const fetchProfileData = async () => {
        try {
            //get data for id=2 (placeholder)
            const response = await axios.get(
                "http://localhost:8080/profilePage/2"
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);
    //---------------Form validation--------------------------------

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        let newData = {
            id: 2,
            name: name,
            email: email,
            age: age,
            location: location,
            cuisinePreferences: cuisinePreferences,
        };
        if (newData.name == "") newData.name = data.name;
        if (newData.email == "") newData.email = data.email;
        if (newData.age == "") newData.age = data.age;
        if (newData.location == "") newData.location = data.location;
        if (newData.cuisinePreferences == "")
            newData.cuisinePreferences = data.cuisinePreferences;

        axios
            // post new message to server
            .post("http://localhost:8080/editInfo", newData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        navigate("/profilePage");
    };

    //---------------------------returning------------------------------
    return (
        <div>
            <ProfileNavbarComponent />
            <div id="title">
                <br></br>
                <p>Edit Profile</p>
            </div>

            <div id="pfImg">
                <Image
                    src="https://picsum.photos/100/100"
                    roundedCircle
                    height="140"
                    width="140"
                />
            </div>

            <div id="changeImageText">
                <Link to={"/addImage"}>Change Profile Image</Link>
            </div>

            {/*------------------------------Form section------------------------*/}
            <div id="infoEdit">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            defaultValue={data.name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            defaultValue={data.email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            defaultValue={data.age}
                            required
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Location"
                            defaultValue={data.location}
                            required
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cuisine Preferences</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cuisine preferences (Ex: Korean)"
                            defaultValue={data.cuisinePreferences}
                            required
                            onChange={(e) =>
                                setCusinePreferences(e.target.value)
                            }
                        />
                    </Form.Group>
                    <br></br>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>{" "}
                    <Button href={"/profilePage"} variant="secondary">
                        Done
                    </Button>{" "}
                </Form>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfilePage;
