import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./searchbar.css";
import Filter from "./filter";

function SearchBarComponent() {
	const [filterOpen, setFilterOpen] = React.useState(false);
	return (
		<div className="mt-5" style={{ display: "flex", justifyContent: "center" }}>
			<Form className="d-flex" style={{ minWidth: "30%" }}>
				<Form.Control
					type="search"
					placeholder="Search for groups..."
					className="me-2 searchbar"
					aria-label="Search"
					size="lg"
				/>
				<Button className="custom-btn2 me-2">Search</Button>
				<Button
					className="custom-btn2"
					onClick={() => {
						// setOpen(true);
						console.log("filter");
						setFilterOpen(true);
					}}
				>
					Filter
				</Button>
			</Form>

			<Filter // The invisible filter itself
				open={filterOpen}
				handleClose={() => {
					setFilterOpen(false);
				}}
			/>
		</div>
	);
}

export default SearchBarComponent;
