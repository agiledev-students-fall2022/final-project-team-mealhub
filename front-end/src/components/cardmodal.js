import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./cardmodal.css";

function CardModal(props) {
	// const [open, setOpen] = React.useState(true);
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
						<span className="modal-span">{props.data.date}</span>

						<Header>{props.data.restaurant}</Header>
						<span className="modal-span">{props.data.location}</span>
						<br></br>
						<span className="modal-span">
							{props.data.remaining + " spots left"}
						</span>
					</Modal.Description>
				</Modal.Content>
				<Modal.Content>
					<Modal.Description>
						<Header>Description</Header>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
							pulvinar placerat lorem id volutpat. Etiam nulla velit, posuere
							nec lobortis ac, tristique a ante. Donec varius, mauris tristique
							porta imperdiet, lacus turpis congue enim, sit amet dignissim
							lectus nisl in purus. Vestibulum ante ipsum primis in faucibus
							orci luctus et ultrices posuere cubilia curae; Duis ipsum nunc,
							laoreet sit amet molestie ac, rhoncus at lectus. Fusce eu velit
							ligula. Etiam augue magna, facilisis et mollis ac, finibus ut
							massa. Vivamus eu metus luctus, rhoncus lectus vel, accumsan ante.
							Vivamus aliquam eros ut nulla rhoncus, non dapibus nisl fringilla.
							Phasellus ut mi a purus vulputate vehicula. Cras sed porttitor
							nulla. Aliquam pellentesque sapien velit, at volutpat metus
							tristique a. Suspendisse ut viverra enim, sed efficitur ligula.
							Integer tellus lorem, sollicitudin sed erat sed, auctor porta
							purus. Vivamus at tellus ut felis sollicitudin sodales a et velit.
						</p>
						<p>{"Cuisine Location: " + props.data.cuisine}</p>
						<p>{"Budget: " + "$".repeat(Math.floor(props.data.budget))}</p>
						<p>{`Dress-code: ${props.data.dress_code}`}</p>
						<p>
							{props.data.capacity -
								props.data.remaining +
								"/" +
								props.data.capacity}{" "}
							MealHubers | {props.data.name}
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={props.handleClose}>
						Close
					</Button>
					<Button
						content={props.joined ? "Joined!" : "Join"}
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
