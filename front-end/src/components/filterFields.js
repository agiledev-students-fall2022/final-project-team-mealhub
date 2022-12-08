import "./group.css";
import Select from "react-select";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { MDBRow, MDBCol, MDBInput, MDBValidation } from "mdb-react-ui-kit";

function FilterFields(props) {
	const [selected, setSelected] = useState("");
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
		cuisine: "",
		location: "",
		date: "",
		budget: props.bgt,
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
			cuisine: "Select",
			location: "",
			date: "",
			budget: props.bgt,
		});
		setSelected("");
		setValue(20);
	};

	//---------------form submission--------------------------------

	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		let newData = {
			...formValue,
		};
		if (newData.restaurant === "") newData.restaurant = formValue.restaurant;
		if (newData.cuisine === "") newData.cuisine = selected;
		if (newData.location === "") newData.location = formValue.location;
		if (newData.date === "") newData.date = formValue.date;
		if (newData.budget === "") newData.budget = formValue.budget;

		axios
			.post(`${process.env.REACT_APP_URL}/filter`, newData)
			.then((response) => {
				// console.log(response.data);
				// set the card data to the new data recieved
				// props.setCardData
				props.setCardData(response.data.docs);
				props.setCount(response.data.count);
			})
			.catch((err) => {
				console.log(err);
			});

		navigate("/");
		props.close();
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
								onClick={handleSubmit}
								id="SubmitBtn"
								// href="/"
							/>
						</MDBCol>
					</MDBRow>
				</div>
			</MDBValidation>
		</div>
	);
}

export default FilterFields;
