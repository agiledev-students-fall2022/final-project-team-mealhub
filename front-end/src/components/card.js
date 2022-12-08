import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item, Image } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./cardmodal";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

function Card({ data, key }) {
	// this.state = {
	// 	modalOpen: false,
	// };

	let userDetails = JSON.parse(localStorage.getItem("user"));
	// localStorage.getItem("user") == undefined
	// 	? null
	// 	: JSON.parse(localStorage.getItem("user"));
	const [open, setOpen] = React.useState(false);
	const [joined, setJoined] = React.useState(
		userDetails &&
			data &&
			data.members.some((element) => element._id === userDetails._id)
			? true
			: false
	);

	const joinGroup = function () {
		if (userDetails && data && data.members.length < data.capacity) {
			axios
				.patch(`${process.env.REACT_APP_URL}/${userDetails._id}`, {
					groupID: data._id,
				})
				.then((response) => {
					setJoined(!joined);
					window.location.reload();
				});
		} else if (data.members.length >= data.capacity) {
			alert("The Group is unfortunately full!");
		} else {
			alert("Please login");
		}
	};

	const leaveGroup = function () {
		if (userDetails && data.members.length > 1) {
			axios
				.delete(`${process.env.REACT_APP_URL}/`, {
					params: {
						groupID: data._id,
						userID: userDetails._id,
					},
				})
				.then((response) => {
					setJoined(!joined);
					window.location.reload();
					// console.log("deleted");
				});
		} else {
			data.members.length > 1
				? alert("Please login")
				: alert("You can't abandon your group");
		}
	};

	const truncateText = function (str1, leng) {
		if (str1.length > leng && str1.length > 0) {
			let new_str = str1 + " ";
			new_str = str1.substr(0, leng);
			new_str = str1.substr(0, new_str.lastIndexOf(" "));
			new_str = new_str.length > 0 ? new_str : str1.substr(0, leng);
			return new_str + " ...";
		}
		return str1;
	};

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

	const joinButtonAction = () => {
		if (joined) {
			leaveGroup();
		} else {
			joinGroup();
		}
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

						<Item.Extra>
							<div> {truncateText(data.description, 320)}</div>
							<br></br>
							<Button
								floated="right"
								color={joined ? "red" : "green"}
								onClick={() => {
									// setOpen(true);

									joinButtonAction();
								}}
							>
								{joined ? "Leave" : "Join"}
							</Button>
							<Item.Meta>
								<span>
									{data.members == null ? (data.members = []) : null}
									{(data.capacity - data.members.length)
										.toString()
										.replace(/^[0]+/g, "0") + " spots left"}
								</span>
							</Item.Meta>
						</Item.Extra>
						{/* <Item.Meta>
							<span>
								{data.members == null ? (data.members = []) : null}
								{(data.capacity - data.members.length)
									.toString()
									.replace(/^[0]+/g, "0") + " spots left"}
							</span>
						</Item.Meta> */}
					</Item.Content>
				</Item>
			</Item.Group>

			<Cardmodal // The invisible modal itself
				key={key}
				modalOpen={open}
				joined={joined}
				handleJoined={() => {
					joinButtonAction();
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
