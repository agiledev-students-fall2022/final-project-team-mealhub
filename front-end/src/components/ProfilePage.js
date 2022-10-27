import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavbarComponent from "./ProfileNavbar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

function ProfilePage() {
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

	return (
		<Container>
			<ProfileNavbarComponent />
			<div id="title">
				<br></br>
				<p>My Profile</p>
			</div>
			<div id="pfImg">
				<Image
					src="https://picsum.photos/100/100"
					roundedCircle
					height="140"
					width="140"
				/>
			</div>
			<div id="info">
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control placeholder={data.name} disabled />
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control placeholder={data.email} disabled />
				</Form.Group>
				<Form.Group>
					<Form.Label>Age</Form.Label>
					<Form.Control placeholder={data.age} disabled />
				</Form.Group>
				<Form.Group>
					<Form.Label>Location</Form.Label>
					<Form.Control placeholder={data.location} disabled />
				</Form.Group>
				<Form.Group>
					<Form.Label>Cuisine Preferences</Form.Label>
					<Form.Control placeholder={data.cuisinePreferences} disabled />
				</Form.Group>
				<br></br>
			</div>

			<div id="button">
				<Button href={"/editProfilePage"} className="custom-btn ms-2 me-2">
					Edit profile
				</Button>
			</div>
		</Container>
	);
}

export default ProfilePage;
