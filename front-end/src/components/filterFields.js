import "./group.css";
import NavbarComponent from "./navbar";
import Footer from "./footer";
import Select from "react-select";
import React, { useState } from "react";
import coverImg from "../assets/createGroup.jpg";
import { Button } from "semantic-ui-react";

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
} from "mdb-react-ui-kit";

function FilterFields() {
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

	return (
		<div>
			<MDBValidation id="form" className="row g-3" noValidate>
				<MDBInput
					value={formValue.restaurant}
					wrapperClass="mb-4"
					placeholder="Restaurant Name"
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
					placeholder="Location"
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

				<MDBRow>
					<MDBCol md="6">
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
					</MDBCol>

					<MDBCol md="6">
						<MDBInput
							wrapperClass="mb-4"
							label=""
							placeholder="time"
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
						id="form3"
						onChange={handleChange}
						placeholder="Choose Cusine"
						value={selected}
						validation="Please enter Restaurant Name"
						required
						// isMulti
					/>
				</div>
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
								content="Filter"
								floated="right"
								labelPosition="right"
								icon="chevron right"
								// onClick={resetForm}
								id="SubmitBtn"
								href="/"
							/>
						</MDBCol>
					</MDBRow>
				</div>
			</MDBValidation>
		</div>
	);
}

export default FilterFields;
