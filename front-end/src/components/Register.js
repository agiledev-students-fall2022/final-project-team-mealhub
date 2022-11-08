import NavbarComponent from "./navbar";
import Footer from "./footer";
import React from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Register.css";
import axios from "axios";

import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
} from "mdb-react-ui-kit";

function Register() {
	const [firstname, setFirstName] = React.useState("");
	const [secondname, setSecondName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");



	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			firstname: firstname,
			secondname: secondname,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
		};

		axios
			.post(`${process.env.REACT_APP_URL}/register`, data)
			.then((res) => {
				console.log(res);
			}
			)
			.catch((err) => {
				console.log(err);
			}
			);
	
	};



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
								<h2 className="fw-bold mb-2 text-uppercase">Register</h2>
								<p className="text-black-50 mb-5">Welcome to MealHub!</p>

								<MDBInput
									wrapperClass="mb-4 mx-5 w-100"
									labelClass="text-black"
									placeholder="First Name"
									id="formControlLg"
									type="text"
									size="lg"
									value={firstname}
									onChange={(event) => setFirstName(event.target.value)}

								/>
								<MDBInput
									wrapperClass="mb-4 mx-5 w-100"
									labelClass="text-black"
									placeholder="Last Name"
									id="formControlLg"
									type="text"
									size="lg"
									value={secondname}
									onChange={(event) => setSecondName(event.target.value)}

								/>
								<MDBInput
									wrapperClass="mb-4 mx-5 w-100"
									labelClass="text-black"
									placeholder="Email address"
									id="formControlLg"
									type="email"
									size="lg"
									value={email}
									onChange={(event) => setEmail(event.target.value)}

								/>
								<MDBInput
									wrapperClass=" mb-4 mx-5 w-100"
									labelClass="text-black"
									placeholder="Password"
									id="formControlLg"
									type="password"
									size="lg"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
								<MDBInput
									wrapperClass=" mb-4 mx-5 w-100"
									labelClass="text-black"
									placeholder="Confirm Password"
									id="formControlLg"
									type="password"
									size="lg"
									value={confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
								/>

								<MDBCol>
									<Button
										class="ui button"
										content="Sign Up"
										labelPosition="center"
										icon="chevron right"
										id="SubmitBtn"
										href="/"
										onClick={handleSubmit}
									/>
								</MDBCol>

								<hr className="my-4 w-100" />

								<p className="text-black-50 mb-1">or sign up with:</p>

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
										Already have an account?{" "}
										<a
											href="Login"
											class="text-50 fw-bold"
											style={{ color: "#eb6f3e" }}
										>
											Sign In
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

export default Register;
