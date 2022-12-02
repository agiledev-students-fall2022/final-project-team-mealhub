import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import "./navbar.css";

//ctreate a functino for axios post request to logout

function logout(setLogged) {
	console.log("here");

	axios
		.get(`${process.env.REACT_APP_URL}/logout`, { withCredentials: true })
		.then((res) => {
			localStorage.removeItem("user");
			if (res.data) {
				window.location.href = "/";
			}
			//change state to true
			setLogged(true);
		})
		.catch((err) => {
			console.log(err);
		});
}

function NavbarComponent() {
	const [logged, setLogged] = React.useState(false);

	React.useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_URL}/checklogin`, { withCredentials: true })
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
