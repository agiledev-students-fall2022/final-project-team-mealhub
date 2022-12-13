import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import "./navbar.css";
//import { set } from "mongoose";

//ctreate a functino for axios post request to logout

const token = {
	jwt: localStorage.getItem("token"),
}

function logout(setLogged) {
	axios
		.post(`${process.env.REACT_APP_URL}/logout`,token , { withCredentials: true })
		.then((res) => {
			localStorage.removeItem("user");
			//remove jwt-token cookie
			if (res.status==200) {
				localStorage.removeItem("token");
				document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
				setLogged(false)
				window.location.href = "/";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

function NavbarComponent() {
	const [logged, setLogged] = React.useState(false);

	React.useEffect(() => {
		if(!(localStorage.getItem("token")))
		{
			setLogged(false);
		}
		else
		{
		{
		axios
			.post(`${process.env.REACT_APP_URL}/checkuser`, token, { withCredentials: true })
			.then((res) => {
				console.log(res);
				//if we get status 200, then user is signed in
				if (res.status === 200) {
					setLogged(true);
				} else {
					setLogged(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		}
		}
	}, []);

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			sticky="top"
			style={{ borderBottom: "1px solid #f0f0f0", backgroundColor: "#fff" }}
		>
			<Container>
				<Navbar.Brand href="/">
					<img src={Logo} height="35" alt="MealHub" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto"></Nav>
					{logged ? (
						<Nav>
							<Nav.Link href="./createGroup" className="custom-start ms-2 me-2">
								<b>Start a new group</b>
							</Nav.Link>

							<Nav.Link href="./myGroup" className="custom-signup ms-2 me-2">
								<b>My Groups</b>
							</Nav.Link>

							<Nav.Link
								onClick={() => {
									logout(setLogged);
								}}
								className="custom-signup ms-2 me-2"
							>
								<b>Logout</b>
							</Nav.Link>
							<Button href="./profilePage" className="custom-btn ms-2 me-2">
								<CgProfile />
							</Button>
						</Nav>
					) : (
						<Nav>
							<Nav.Link href="./createGroup" className="custom-start ms-2 me-2">
								<b>Start a new group</b>
							</Nav.Link>
							<Nav.Link href="./Register" className="custom-signup ms-2 me-2">
								Sign up
							</Nav.Link>
							<Button href="./Login" className="custom-btn ms-2 me-2">
								Sign in
							</Button>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;
