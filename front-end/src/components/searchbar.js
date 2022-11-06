import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./searchbar.css";
import Filter from "./filter";
import {useEffect, useState} from "react";
import axios from "axios";

function SearchBarComponent() {
	const [filterOpen, setFilterOpen] = useState(false);
	const [searchStr, setSearchStr] = useState("");
	const [data, setData] = useState("");
	
	const getResponse = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/search", {
					params: {
					  search: searchStr
					}
				  }
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };
	
	
	return (
		<div className="mt-5" style={{ display: "flex", justifyContent: "center" }}>
			<Form className="d-flex" style={{ minWidth: "30%" }}>
				<Form.Control
					type="search"
					placeholder="Search for groups..."
					className="me-2 searchbar"
					aria-label="Search"
					onChange={e => setSearchStr(e.target.value)}
					value={searchStr}
					size="lg"
				/>
				<Button className="custom-btn2 me-2" onClick={()=>{getResponse()}}>Search</Button>
				<Button
					className="custom-btn2"
					onClick={() => {
						// setOpen(true);
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
