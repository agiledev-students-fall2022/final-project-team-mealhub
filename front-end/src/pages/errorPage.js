import "bootstrap/dist/css/bootstrap.min.css";
import "./errorPage.css"; 
import Footer from "../components/footer";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavbarComponent from "../components/ProfileNavbar";
import Container from "react-bootstrap/esm/Container";


function ErrorPage() {
    return (
        <Container>
        <ProfileNavbarComponent />

        <div className="errorPage">
            {/* <Image src="https://i.imgur.com/qIufhof.png" /> */}
            <div id="header">
                <h1>404 Error</h1>
            </div>
             
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>



        <Footer />
        </Container>
    );
}

export default ErrorPage;
