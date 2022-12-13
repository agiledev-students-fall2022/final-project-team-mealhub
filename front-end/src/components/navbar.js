import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import "./navbar.css";
import Cookies from "js-cookie";

//ctreate a functino for axios post request to logout

function logout(setLogged) {
	console.log("here");

	axios
		.get(`${process.env.REACT_APP_URL}/logout`, { withCredentials: true })
		.then((res) => {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("jwt-token");
			document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

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

	const token = localStorage.getItem("token");
	const data = {
		email: "test",
		token
	  };
	

	React.useEffect(() => {
		console.log(data);
		axios
			.post(`${process.env.REACT_APP_URL}/checklogin`, data, { withCredentials: true })
			.then((res) => {
				console.log(res);
				//read token from local storage and print it 
				const token = localStorage.getItem("token");
				console.log("tt",token);

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

			axios
			.post(`${process.env.REACT_APP_URL}/checkuser`, data, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				//if res.data has data, save the item in local storage
				if (res.data) {
					localStorage.setItem("userData", JSON.stringify(res.data));
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
