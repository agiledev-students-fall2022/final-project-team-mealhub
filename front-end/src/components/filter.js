import React from "react";
import { Header, Modal } from "semantic-ui-react";
import Box from "@mui/material/Box";
import Slider, { SliderThumb } from "@mui/material/Slider";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FilterFields from "./filterFields";
import { styled } from "@mui/material/styles";
import "./filter.css";

const PriceSlider = styled(Slider)(({ theme }) => ({
	color: "#eb6f3e",
	height: 3,
	padding: "13px 0",
	"& .MuiSlider-thumb": {
		height: 27,
		width: 27,
		backgroundColor: "#fff",
		border: "1px solid currentColor",
		"&:hover": {
			boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
		},
		"& .airbnb-bar": {
			height: 9,
			width: 1,
			backgroundColor: "currentColor",
			marginLeft: 1,
			marginRight: 1,
		},
	},
	"& .MuiSlider-track": {
		height: 3,
	},
	"& .MuiSlider-rail": {
		color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
		opacity: theme.palette.mode === "dark" ? undefined : 1,
		height: 3,
	},
}));

function PriceThumbComponent(props) {
	const { children, ...other } = props;
	return (
		<SliderThumb {...other}>
			{children}
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
		</SliderThumb>
	);
}

PriceThumbComponent.propTypes = {
	children: PropTypes.node,
};

function Filter(props) {
	const bgt = React.useRef([20, 40]);
	const [budget, setBudget] = React.useState([20, 40]);
	return (
		<Modal
			closeIcon
			open={props.open}
			onClose={props.handleClose}
			closeOnEscape
			closeOnRootNodeClick={true}
			// å
			closeOnDocumentClick={true}
		>
			<Header icon="" content="Filter" className="filter-header" />
			<Modal.Content>
				<Box>
					<Typography gutterBottom>Meal Budget</Typography>
					<PriceSlider
						// key={`slider-${budget}`}
						valueLabelDisplay="auto"
						slots={{ thumb: PriceThumbComponent }}
						onChange={(e) => {
							setBudget(e.target.value);
							bgt.current = e.target.value;
						}}
						getAriaLabel={(index) =>
							index === 0 ? "Minimum price" : "Maximum price"
						}
						defaultValue={[20, 40]}
						disableSwap
					/>
					<Typography>MealHub Plus</Typography>
					<Switch defaultChecked color="warning" />

					<FilterFields
						budget={budget}
						bgt={bgt}
						setCardData={props.setCardData}
						open={props.filterOpen}
						close={props.handleClose}
						setCount={props.setCount}
					/>
				</Box>
			</Modal.Content>
			<Modal.Actions>
				{/* <Button
					// color="red"
					onClick={() => {
						props.handleClose();
					}}
				>
					<Icon name="remove" /> Close
				</Button> */}
			</Modal.Actions>
		</Modal>
	);
}

export default Filter;
