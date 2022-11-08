import NavbarComponent from "./navbar";
import Footer from "./footer";
import React from "react";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";

import "./Login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/login`, data)
      .then((res) => {
		
        console.log(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  //const onChange to update the value
  // const onChange = (event) => {
  // 	const { name, value } = event.target;
  // 	if (name === "email") {
  // 		setEmail(value);
  // 	} else if (name === "password") {
  // 		setPassword(value);
  // 	}

  console.log(email, password);
  // };

  return (
    <div>
      <NavbarComponent />
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="text-dark my-5 mx-auto"
              style={{
                borderRadius: "1rem",
                maxWidth: "400px",
                backgroundColor: "#ffffff",
              }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Welcome Back</h2>
                <p className="text-black-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-black"
                  placeholder="Email address"
                  id="formControlLg"
                  type="email"
                  className="form-control"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <MDBInput
                  wrapperClass=" mb-4 mx-5 w-100"
                  labelClass="text-black"
                  placeholder="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <p className="small mb-3 pb-lg-2">
                  <a class="text-blue-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <MDBCol>
                  <Button
                    class="ui button"
                    content="Login"
                    labelPosition="center"
                    icon="chevron right"
                    id="SubmitBtn"
                    href="/"
                    onClick={handleSubmit}
                  />
                </MDBCol>

                <hr className="my-4 w-100" />

                <p className="text-black-50 mb-1">or sign in with:</p>

                <div className="d-flex flex-row mt-3 mb-5">
                  <Icon
                    name="facebook f"
                    size="large"
                    id="paddingright"
                    className="socials"
                  />
                  <Icon
                    name="google"
                    size="large"
                    id="paddingleft"
                    className="socials"
                  />
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a
                      href="Register"
                      class="text-50 fw-bold"
                      style={{ color: "#eb6f3e" }}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default Login;
