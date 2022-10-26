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
	return (
		<div className="card-component">
			<Item.Group>
				<Item>
					<Item.Image size="small" src={"https://picsum.photos/200"} />

					<Item.Content>
						<Item.Meta>
							<span>{data.date}</span>
						</Item.Meta>
						<Item.Header as="a">{data.restaurant}</Item.Header>
						<Item.Description>{data.location}</Item.Description>
						<Item.Meta>
							<span>{data.remaining + " spots left"}</span>
						</Item.Meta>
						<Item.Extra>
							<Button
								floated="right"
								onClick={() => {
									setOpen(true);
									console.log("clicked");
								}}
							>
								Join
							</Button>
						</Item.Extra>
					</Item.Content>
				</Item>
			</Item.Group>

			<Cardmodal // The invisible modal itself
				key={key}
				modalOpen={open}
				handleClose={() => {
					setOpen(false);
				}}
				data={data}
			/>
		</div>
	);
}

export default Card;
