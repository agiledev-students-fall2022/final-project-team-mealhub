import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../assets/logo.png";
import React, { useState } from 'react';
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import "./navbar.css";


//ctreate a functino for axios post request to logout

function logout() {
	axios
		.get(`${process.env.REACT_APP_URL}/logout`, {withCredentials: true})
		.then((res) => {
			console.log(res);
			if(res.data)
			{
				window.location.href = "/";
			}
		})
		.catch((err) => {
			console.log(err);
		});
}


function NavbarComponent() {
	const [logged, setLogged] = useState(false);

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
					{logged ? <Nav>
						<Nav.Link href="./createGroup" className="custom-start ms-2 me-2">
							<b>Start a new group</b>
						</Nav.Link>
						{/* onClick of logout, go to /logout from the axios post */}
						<Nav.Link onClick={logout()} className="custom-signup ms-2 me-2">
						</Nav.Link>
						<Button href="./profilePage" className="custom-btn ms-2 me-2">
						<CgProfile />
						</Button>
					</Nav>
					: <Nav>
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
					}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;
