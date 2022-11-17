import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./cardmodal";

function Card({ data, key }) {
	// this.state = {
	// 	modalOpen: false,
	// };
	const [open, setOpen] = React.useState(false);
	const [joined, setJoined] = React.useState(data.joined);
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
							<span>{data.date}</span>
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
							<span>{data.remaining + " spots left"}</span>
						</Item.Meta>
						<Item.Extra>
							<Button
								floated="right"
								onClick={() => {
									// setOpen(true);
									setJoined(!joined);
								}}
							>
								{joined ? "Joined!" : "Join"}
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
