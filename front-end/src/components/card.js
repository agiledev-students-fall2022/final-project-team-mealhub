import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";

const Card = ({ data }) => (
	<div className="card-component">
		<Item.Group>
			<Item>
				<Item.Image size="small" src={data.image} />

				<Item.Content verticalAlign="middle">
					<Item.Meta>
						<span>{data.date}</span>
					</Item.Meta>
					<Item.Header as="a">{data.restaurant}</Item.Header>
					<Item.Description>{data.location}</Item.Description>
					<Item.Meta>
						<span>{data.capacity + " spots left"}</span>
					</Item.Meta>
					<Item.Extra>
						<Button floated="right">Join</Button>
					</Item.Extra>
				</Item.Content>
			</Item>
		</Item.Group>
	</div>
);

export default Card;
