import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/logo.png'
import './navbar.css';

function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" style={{borderBottom: '1px solid #f0f0f0'}}>
            <Container>
                <Navbar.Brand href="#home"><img src={Logo} height="35" alt="MealHub"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#start-a-new-group" className='custom-start ms-2 me-2'><b>Start a new group</b></Nav.Link>
                        <Nav.Link href="#sign-up" className='custom-signup ms-2 me-2'>Sign up</Nav.Link>
                        <Button href="#sign-in" className='custom-btn ms-2 me-2'>Sign in</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
