import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./cardmodal.css";
import dateFormat, { masks } from "dateformat";

function CardModal(props) {
	// const [open, setOpen] = React.useState(true);
	const user = {
		createdAt: "2022-11-19T06:22:11.461Z",
		displayName: "Test Er",
		email: "tester@gmail.com",
		firstName: "Test",
		lastName: "Er",
		password: "$2b$10$fMEQ7TK.wsR0T3jBjjaQZOms9kyPU45wU1h2aocyQf9Q/NsVI/DEC",
		__v: 0,
		_id: "637876133b70b16a643dfb29",
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
							{dateFormat(props.data.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
						</span>

						<Header>{props.data.restaurant}</Header>
						<span className="modal-span">{props.data.location}</span>
						<br></br>
						<span className="modal-span">
							{props.data.members == null ? (props.data.members = []) : null}

							{+(props.data.capacity - props.data.members.length) * 1 +
								" spots left"}
						</span>
					</Modal.Description>
				</Modal.Content>
				<Modal.Content>
					<Modal.Description>
						<Header>Description</Header>
						<p>{props.data.description}</p>
						<p>{"Cuisine Location: " + props.data.cuisine}</p>
						<p>{"Budget: $" + props.data.budget}</p>
						<p>{`Dress-code: ${props.data.dress_code}`}</p>
						<p>
							{props.data.user == null ? (props.data.user = user) : null}
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
