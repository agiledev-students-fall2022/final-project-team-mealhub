import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/esm/NavLink";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./footer.css";

function Footer() {
	return (
		<Container id="pad">
			<Navbar
				collapseOnSelect
				expand="lg"
				sticky="bottom"
				style={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fff" }}
				className="footer"
			>
				<Container className="d-flex justify-content-center">
					<Nav>
						<NavLink className="d-flex justify-content-center me-2 ms-2">
							© 2022 MealHub
						</NavLink>
						{/* <NavLink
							href=""
							className="d-flex justify-content-center me-2 ms-2"
						>
							Terms of service
						</NavLink>
						<NavLink
							href=""
							className="d-flex justify-content-center me-2 ms-2"
						>
							Privacy Policy
						</NavLink> */}
					</Nav>
				</Container>
			</Navbar>
		</Container>
	);
}

export default Footer;
