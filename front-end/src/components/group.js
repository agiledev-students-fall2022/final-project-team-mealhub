import "./group.css";
import NavbarComponent from "./navbar";
import Footer from "./footer";
import Select from "react-select";
import React, { useState } from "react";
import coverImg from "../assets/createGroup.jpg";
import { Button } from "semantic-ui-react";

import {
  MDBBtn,
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
} from "mdb-react-ui-kit";

function Group() {
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
  //   const numberFormat = (value) =>
  //     new Intl.NumberFormat("en-IN", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(value);

  // const numCheck = (value) => {
  // value = value.replace(/\D/g,'');
  // return ("$" +(value));
  // };

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
    budgetDollar: "20",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const [value, setValue] = useState(20);

  console.log(value);
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
      budgetDollar: "20",
    });
    setSelected(null);
    setValue(20);
    console.log("Form reset");
  };

  return (
    <div>
      <NavbarComponent />
      <MDBValidation id="form" className="row g-3" noValidate>
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

                      <MDBInput
                        value={formValue.restaurant}
                        wrapperClass="mb-4"
                        label="Restaurant Name"
                        validation="Please enter Restaurant Name"
                        required
                        size="lg"
                        name="restaurant"
                        id="form3"
                        type="text"
                        onChange={onChange}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Location"
                        name="location"
                        value={formValue.location}
                        size="lg"
                        id="form3"
                        type="text"
                        onChange={onChange}
                        validation="Please enter Restaurant Name"
                        required
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Number of Attendees"
                        name="attendees"
                        value={formValue.attendees}
                        size="lg"
                        id="form3"
                        type="number"
                        onChange={onChange}
                        validation="Please enter Restaurant Name"
                        required
                      />

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Date"
                            name="date"
                            value={formValue.date}
                            size="lg"
                            id="form3"
                            type="date"
                            onChange={onChange}
                            validation="Please enter Restaurant Name"
                            required
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label=""
                            name="time"
                            value={formValue.time}
                            size="lg"
                            id="form3"
                            type="time"
                            onChange={onChange}
                            validation="Please enter Restaurant Name"
                            required
                          />
                        </MDBCol>
                      </MDBRow>

                      <div className="cusines">
                        <Select
                          options={cusines}
                          name="cusines"
                          onChange={handleChange}
                          placeholder="Choose Cusine"
                          value={selected}
                          validation="Please enter Restaurant Name"
                          required
                          // isMulti
                        />
                      </div>

                      <MDBInput
                        className="form-control"
                        wrapperClass="mb-4"
                        label="Email ID"
                        name="email"
                        value={formValue.email}
                        size="lg"
                        id="form6"
                        type="email"
                        onChange={onChange}
                        validation="Please enter Restaurant Name"
                        required
                      />

                      <MDBRow>
                        <MDBCol md="7">
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

                        <MDBCol md="3" id="dollarRow">
                          <MDBInputGroup className="mb-2" textBefore="$">
                            <input
                              className="form-control"
                              type="text"
                              name="budgetDollar"
                              onChange={(e) => setValue(e.target.value)}
                              value={value}
                              validation="Please enter Restaurant Name"
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
                              content="Submit Group"
                              labelPosition="right"
                              icon="chevron right"
                              // onClick={resetForm}
                              id="SubmitBtn"
                              href = "/"
                            />
                          </MDBCol>
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
