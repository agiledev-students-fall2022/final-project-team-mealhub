import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./cardmodal";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

function Card({ data, key }) {
	const [open, setOpen] = React.useState(false);
	const [joined, setJoined] = React.useState(data.joined);

	const convertTime = function (time) {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(""); // return adjusted time or original string
	};

	return (
		<div className="card-component">
			<Item.Group>
				<Item>
					<Item.Image
						size="small"
						src={data.image}
						onClick={() => {
							setOpen(true);
						}}
					/>

					<Item.Content>
						<Item.Meta>
							<span>
								{dateFormat(data.date, "dddd, mmmm dS, yyyy").toString() +
									" @ " +
									convertTime(data.time)}
							</span>
						</Item.Meta>
						<Item.Header
							as="a"
							onClick={() => {
								setOpen(true);
							}}
						>
							{data.restaurant}
						</Item.Header>
						<Item.Description>{data.location}</Item.Description>
						<Item.Meta>
							<span>
								{(data.capacity - data.members.length)
									.toString()
									.replace(/^[0]+/g, "0") + " spots left"}
							</span>
						</Item.Meta>

						<Item.Extra>
							<Button
								floated="right"
								color="red"
								onClick={() => {
									setJoined(!joined);
									axios
										.delete(`${process.env.REACT_APP_URL}/myGroup/${data._id}`)
										.then((response) => {
											console.log(response.data);
											setJoined(false);
											// if axios delete is responds with sucess redirect mygroups page
											window.location.href = "/myGroup";
											// navigate("/myGroup");
										});
								}}
							>
								{joined ? "Delete" : "Delete"}
							</Button>
						</Item.Extra>
					</Item.Content>
				</Item>
			</Item.Group>

			<Cardmodal // The invisible modal itself
				key={key}
				modalOpen={open}
				joined={joined}
				handleJoined={() => {
					setJoined(!joined);
				}}
				handleClose={() => {
					setOpen(false);
				}}
				data={data}
			/>
		</div>
	);
}

export default Card;
