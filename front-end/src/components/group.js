import "./group.css";
import axios from "axios";
import NavbarComponent from "./navbar";
import Footer from "./footer";
import Select from "react-select";
import React, { useState } from "react";
import coverImg from "../assets/createGroup.jpg";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import {

  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRange,
  MDBInputGroup,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

function Group() {
  
  // `${process.env.REACT_APP_URL}/createGroup`
  const url = "http://localhost:3001/createGroup";
  // console.log(`${process.env.REACT_APP_URL}/createGroup`)
  const [selected, setSelected] = useState(null);
  const [cusines, setCusine] = useState([
    { label: "American", value: "American" },
    { label: "Indian", value: "Indian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Italian", value: "Italian" },
    { label: "Korean", value: "Korean" },
    { label: "Mediterranean", value: "Mediterranean" },
    { label: "Japanese", value: "Japanese" },
  ]);


	const handleChange = (selected) => {
		setSelected(selected);
		console.log("Option selected:", selected);
	};


  const [formValue, setFormValue] = useState({
    restaurant: "",
    email: "",
    cuisine: "",
    attendees: "",
    price: "",
    location: "",
    date: "",
    time: "",
    budget: "",
    name: "",
    budgetDollar: "20",
  });


	const onChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const [value, setValue] = useState(20);

	// console.log(numCheck(value));
	const resetForm = () => {
		document.getElementById("form").reset();
		setFormValue({
			restaurant: "",
			email: "",
			cuisine: "Select",
			attendees: "",
			price: "",
			location: "",
			date: "",
			time: "",
			budget: "",
			name: "",
			budgetDollar: "20",
		});
		setSelected(null);
		setValue(20);
		console.log("Form reset");
	};

  const navigate = useNavigate();
  const onSubmit = (e) => {
    // if ( isEmailValid ) {
    //   okButton.disabled = false;
    // } else {
    //   okButton.disabled = true;
    // }
    e.preventDefault();


		console.log("Form submitted");
		console.log(formValue);
		console.log(selected);
		console.log(value);
    // console.log(`${process.env.REACT_APP_URL}/createGroup`)

    if (formValue.name && formValue.email && formValue.restaurant && selected && formValue.time && formValue.date && formValue.attendees && formValue.location){
      // SubmitBtn.disabled = false; 
    axios
      .post(`${process.env.REACT_APP_URL}/createGroup`, {
        restaurant: formValue.restaurant,
        email: formValue.email,
        cuisine: selected.value,
        attendees: formValue.attendees,
        location: formValue.location,
        date: formValue.date,
        time: formValue.time,
        name: formValue.name,
        budgetDollar: value,
      })
      .then((res) => {
        console.log("sent Data");
        console.log(res.data);
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
        
      });
    }
    else {
      console.log("Please fill out all required fields");
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
				<MDBContainer fluid className="bg-white">
					<MDBRow className="d-flex justify-content-center align-items-center h-100">
						<MDBCol className="mainCard" lg="10">
							<MDBCard className="my-3">
								<MDBRow className="g-0">
									<MDBCol md="5" className="d-none d-md-block" id="imgDiv">
										<MDBCardImage
											src={coverImg}
											alt="Cover Image for Create Group"
											className="rounded-start"
											fluid
										/>
									</MDBCol>

									<MDBCol md="6">
										<MDBCardBody className="text-black d-flex flex-column justify-content-left">
											<h3 className="mb-4 fw-bold" id="title">
												Create New Group
											</h3>
											<MDBValidationItem
												feedback="Please provide Restaurant Name."
												invalid
											>
												<MDBInput
													value={formValue.restaurant}
													wrapperClass="mb-4"
													placeholder="Restaurant Name"
													required
													size="lg"
													name="restaurant"
													id="form3"
													type="text"
													onChange={onChange}
												/>
											</MDBValidationItem>

											<MDBValidationItem
												feedback="Please provide the location"
												invalid
											>
												<MDBInput
													wrapperClass="mb-4"
													placeholder="Location"
													name="location"
													value={formValue.location}
													size="lg"
													id="form3"
													type="text"
													onChange={onChange}
													required
												/>
											</MDBValidationItem>
                      
                      <MDBValidationItem
                        feedback="Please provide the Number of Attendees"
                        invalid
                      >
                        <MDBInput
                          wrapperClass="mb-4"
                          placeholder="Number of Attendees"
                          name="attendees"
                          value={formValue.attendees}
                          size="lg"
                          id="form3"
                          type="number"
                          onChange={onChange}
                          validation="Please enter Restaurant Name"
                          required
                        />
                      </MDBValidationItem>


											<MDBRow>
												<MDBCol md="6">
													<MDBValidationItem
														feedback="Please provide the date"
														invalid
													>
														<MDBInput
															wrapperClass="mb-4"
															placeholder="Date"
															name="date"
															value={formValue.date}
															size="lg"
															id="form3"
															type="date"
															onChange={onChange}
															validation="Please enter Restaurant Name"
															required
														/>
													</MDBValidationItem>
												</MDBCol>

												<MDBCol md="6">
													<MDBValidationItem
														feedback="Please provide the time"
														invalid
													>
														<MDBInput
															wrapperClass="mb-4"
															placeholder="time"
															value={formValue.time}
															name="time"
															size="lg"
															id="form3"
															type="time"
															onChange={onChange}
															validation="Please enter Restaurant Name"
															required
														/>
													</MDBValidationItem>
												</MDBCol>
											</MDBRow>

											<div className="cusines">
												<MDBValidationItem
													feedback="Please provide the cuisine"
													invalid
												>
													<Select
														options={cusines}
														name="cusines"
														id="form3"
														onChange={handleChange}
														placeholder="Choose Cusine"
														value={selected}
														validation="Please enter Restaurant Name"
														required
														theme={(theme) => ({
															...theme,
															// borderRadius: 0,
															colors: {
																...theme.colors,
																primary25: "#e7c4a9",
																primary: "#eb6f3f",
															},
														})}
														// isMulti
													/>
												</MDBValidationItem>
											</div>

											<MDBValidationItem
												feedback="Please provide your name"
												invalid
											>
												<MDBInput
													className="form-control"
													wrapperClass="mb-4"
													placeholder="Your name"
													name="name"
													value={formValue.name}
													size="lg"
													id="form3"
													type="text"
													onChange={onChange}
													validation="Enter your name"
													required
												/>
											</MDBValidationItem>

											<MDBValidationItem
												feedback="Please provide the Email ID"
												invalid
											>
												<MDBInput
													className="form-control"
													wrapperClass="mb-4"
													placeholder="Email ID"
													name="email"
													value={formValue.email}
													size="lg"
													id="form3"
													type="email"
													onChange={onChange}
													validation="Please enter Restaurant Name"
													required
												/>
											</MDBValidationItem>

											<MDBRow>
												<MDBCol md="8">
													<MDBRange
														defaultValue={20}
														name="budget"
														min="0"
														max="100"
														step="5"
														id="range"
														label="Meal Budget"
														onChange={(e) => setValue(e.target.value)}
														value={value}
													/>
												</MDBCol>

												<MDBCol md="2" id="dollarRow">
													<MDBInputGroup className="mb-2" textBefore="$">
														<input
															className="form-control"
															type="text"
															name="budgetDollar"
															onChange={(e) => setValue(e.target.value)}
															value={value}
															id="form3"
															required
														/>
													</MDBInputGroup>
												</MDBCol>
											</MDBRow>

											<div className="Buttons">
												<MDBRow>
													<MDBCol>
														<Button
															class="ui right floated button"
															content="Reset All"
															labelPosition="right"
															icon="redo"
															onClick={resetForm}
															id="butTton"
														/>
													</MDBCol>

													<MDBCol>
														<Button
															type="submit"
															content="Submit Group"
															labelPosition="right"
															icon="chevron right"
															// onClick={onSubmit}
															id="SubmitBtn"
															// onClick={(e) => onSubmit(e)}
															// disabled
															// href="/createGroup"
															// onSubmit= {handleSubmit}
														/>
													</MDBCol>
													{/* <MDBBtn color="primary" type="submit" >Submit form</MDBBtn> */}
												</MDBRow>
											</div>
										</MDBCardBody>
									</MDBCol>
								</MDBRow>
							</MDBCard>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</MDBValidation>

			<Footer />
		</div>
	);
}

export default Group;
