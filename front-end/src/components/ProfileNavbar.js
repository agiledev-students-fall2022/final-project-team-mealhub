import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logo from "../assets/logo.png";
import "./navbar.css";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileNavbarComponent() {
    const navigate = useNavigate();

    //TO LOGOUT
    const handleClick = () => {
        axios.get(`${process.env.REACT_APP_URL}/logout`, {
            withCredentials: true,
        });
        navigate("/");
    };

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
                        <Nav.Link
                            href="./createGroup"
                            className="custom-start ms-2 me-2"
                        >
                            <b>Start a new group</b>
                        </Nav.Link>
                        <Nav.Link
                            href="./myGroup"
                            className="custom-signup ms-2 me-2"
                        >
                            <b>My Groups</b>
                        </Nav.Link>

                        <Nav.Link
                            className="custom-signup ms-2 me-2"
                            onClick={handleClick}
                        >
                            Logout
                        </Nav.Link>
                        <Button
                            href="./profilePage"
                            className="custom-btn ms-2 me-2"
                        >
                            <CgProfile />
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ProfileNavbarComponent;
