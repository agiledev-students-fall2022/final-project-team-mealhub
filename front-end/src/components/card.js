import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./cardmodal";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

function Card({ data, key }) {
	// this.state = {
	// 	modalOpen: false,
	// };
	let userDetails = JSON.parse(localStorage.getItem("user"));
	const [open, setOpen] = React.useState(false);
	const [joined, setJoined] = React.useState(
		userDetails &&
			data.members.some(
				(element) => element._id.toString() === userDetails._id.toString()
			)
			? true
			: false
	);

	const joinGroup = function () {
		if (userDetails) {
			axios
				.post(`${process.env.REACT_APP_URL}/${userDetails._id}`, {
					groupID: data._id,
				})
				.then((response) => {
					setJoined(!joined);
				});
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
				});
		} else {
			data.members.length > 1
				? alert("Please login")
				: alert("You can't abandon your group");
		}
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
						width="200"
						height="200"
						className="card-image"
						onClick={() => {
							setOpen(true);
						}}
					/>

					<Item.Content>
						<Item.Meta>
							<span>
								{dateFormat(data.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
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
								{data.members == null ? (data.members = []) : null}
								{(data.capacity - data.members.length)
									.toString()
									.replace(/^[0]+/g, "0") + " spots left"}
							</span>
						</Item.Meta>
						<Item.Extra>
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
						</Item.Extra>
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
