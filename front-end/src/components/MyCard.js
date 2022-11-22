import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./cardmodal";
import axios from "axios";



function Card({ data, key }) {
	// this.state = {
	// 	modalOpen: false,
	// };
	const [open, setOpen] = React.useState(false);
	const [joined, setJoined] = React.useState(data.joined);

	// const Remove = () => {
	// 	axios
	// 		.delete(`${process.env.REACT_APP_URL}/myGroup/${data._id}`)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			setJoined(false);
	// 		});
	// };

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
								{joined ? "Joined!" : "Joined!"}
							</Button>
						</Item.Extra>

						<Item.Extra>
							<Button
								floated="right"
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
							 	{joined ? "Remove" : "Remove"}
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
