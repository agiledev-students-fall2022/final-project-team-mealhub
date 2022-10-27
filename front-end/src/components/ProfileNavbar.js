import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../assets/logo.png";
import "./navbar.css";
import { CgProfile } from "react-icons/cg";

function ProfileNavbarComponent() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      style={{ borderBottom: "1px solid #f0f0f0" }}
    >
      <Container>
        <Navbar.Brand href={"/"}>
          <img src={Logo} height="35" alt="MealHub" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="./createGroup" className="custom-start ms-2 me-2">
              <b>Start a new group</b>
            </Nav.Link>
            <Nav.Link href="./" className="custom-signup ms-2 me-2">
              Logout
            </Nav.Link>
            <Button href="./profilePage" className="custom-btn ms-2 me-2">
              <CgProfile />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProfileNavbarComponent;
