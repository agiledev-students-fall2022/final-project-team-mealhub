import NavbarComponent from "./navbar";
import Footer from "./footer";
import React from "react";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setPassword(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

	const token = localStorage.getItem("token");
	// console.log("tt",token);

    const data = {
      email: email,
      password: password,
	  token
    };

    if (email && password) {
      axios
        .post(`${process.env.REACT_APP_URL}/login`, data, {
          withCredentials: true,
        })

        .then((res) => {
          console.log("HELLloo", res.data.token);

          Cookies.get();
		 Cookies.set("jwt-token", res.data.token, {sameSite: 'None', secure: true})

          console.log("hee;;;lo", res);
          if (res.data) {
            console.log(res.cookie);
			//asign the jwt-token in the res cookie
			
			
            const user = res.data.user;
            res.cookie = res.data.token;
            console.log("heel00o", res.cookie);
            console.log("user: ", user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", res.data.token);
            alert("success");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          //if error 403 is returned
          if (err.response.status === 403) {
            alert("Invalid email or password. Please try again!");
          }
          //if error 405 is returned
          if (err.response.status === 405) {
            alert("This email is not registered yet! Try registering first!");
          }

          // Send cookie to the express backend
        });
    } else {
      console.log("Please enter your email and password");
    }
  };
  return (
    <div>
      <NavbarComponent />
      <MDBValidation
        id="form"
        className="row g-3"
        noValidated
        onSubmit={(e) => onSubmit(e)}
      >
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
                  <MDBCol md="12" className="mb-3">
                    <MDBValidationItem
                      className="col-md-9"
                      feedback="Please provide email address"
                      invalid
                    >
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
                        required
                      />
                    </MDBValidationItem>

                    <MDBValidationItem
                      className="col-md-9"
                      feedback="Please provide password"
                      invalid
                    >
                      <MDBInput
                        wrapperClass=" mb-4 mx-5 w-100"
                        labelClass="text-black"
                        placeholder="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </MDBValidationItem>
                  </MDBCol>

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
                      type="submit"
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
      </MDBValidation>
      <Footer />
    </div>
  );
}

export default Login;
