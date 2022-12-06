import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./cardmodal.css";
import dateFormat, { masks } from "dateformat";

function CardModal(props) {
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
		<div className="modal">
			<Modal
				size="small"
				open={props.modalOpen}
				closeOnEscape={true}
				onClose={props.handleClose}
				closeOnRootNodeClick={true}
				closeOnDocumentClick={true}
				// closeIcon={true}
			>
				<Modal.Content image>
					<Image size="small" src={props.data.image} />
					<Modal.Description>
						{/* <Modal.Meta>
							<span>{"12-12-12"}</span>
						</Modal.Meta> */}
						<span className="modal-span">
							{dateFormat(props.data.date, "dddd, mmmm dS, yyyy").toString() +
								" @ " +
								convertTime(props.data.time)}
						</span>

						<Header>{props.data.restaurant}</Header>
						<span className="modal-span">{props.data.location}</span>
						<br></br>
						<span className="modal-span">
							{+(props.data.capacity - props.data.members.length) * 1 +
								" spots left"}
						</span>
					</Modal.Description>
				</Modal.Content>
				<Modal.Content>
					<Modal.Description>
						<Header>Description</Header>
						<p>{props.data.description}</p>
						<p>
							{"Cuisine Location: " +
								props.data.cuisine.charAt(0).toUpperCase() +
								props.data.cuisine.slice(1)}
						</p>
						<p>{"Budget: $" + props.data.budget}</p>
						<p>{`Dress-code: ${props.data.dress_code}`}</p>
						<p>
							{("" + props.data.members.length).replace(/^[0]+/g, "") +
								"/" +
								props.data.capacity}{" "}
							MealHubers | {props.data.user.displayName}
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={props.handleClose}>
						Close
					</Button>
					<Button
						content={props.joined ? "Leave" : "Join"}
						color={props.joined ? "red" : "green"}
						labelPosition="right"
						icon="checkmark"
						onClick={props.handleJoined}
					/>
				</Modal.Actions>
			</Modal>
		</div>
	);
}

export default CardModal;
