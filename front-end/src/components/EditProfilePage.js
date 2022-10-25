import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavbarComponent from "./ProfileNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function EditProfilePage() {
  const [data, setData] = useState([]);

  //render profile data onto the page
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://my.api.mockaroo.com/user_profiles.json?key=18bea250"
      );
      // set the data assuming the first person is the user
      setData(result.data[0]);
    }
    fetchData();
  }, []);
  //---------------Form validation--------------------------------
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
        <Image src={data.profileImage} roundedCircle height="140" width="140" />
      </div>

      <div id="changeImageText">
        <Link to={"/addImage"}>Change Profile Image</Link>
      </div>

      {/*------------------------------Form section------------------------*/}
      <div id="infoEdit">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              defaultValue={data.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              defaultValue={data.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              defaultValue={data.age}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your age.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              defaultValue={data.location}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your current location.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cuisine Preferences</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cuisine preferences (Ex: Korean)"
              defaultValue={data.cuisinePreferences}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide at least one cuisine preference.
            </Form.Control.Feedback>
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
    </div>
  );
}

export default EditProfilePage;
