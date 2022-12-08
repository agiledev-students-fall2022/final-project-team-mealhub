import React from "react";
import { atcb_init } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import dateFormat, { masks } from "dateformat";

const MyComponent = ({ data }) => {
	React.useEffect(() => {
		atcb_init();
	}, []);
	const [name, setName] = React.useState(
		data ? "Meal @ " + data.restaurant : ""
	);

	data.cal = dateFormat(data.date, "yyyy-mm-dd").toString();
	const requiredDataForCalendar = {
		name: name,
		description:
			"A meal with fellow Mealhubers at " +
			data.restaurant +
			" on " +
			dateFormat(data.date, "dddd, mmmm dS, yyyy").toString(),
		startDate: data.cal,
		// endDate: data.date,
		startTime: data.time,
		endTime: data.time,
		trigger: "click",
		location: data.location,
		label: "Add to Calendar",
		options: [
			"Apple",
			"Google",
			"iCal",
			"Microsoft365",
			"Outlook.com",
			"Yahoo",
		],
		timeZone: "America/New_York",
		iCalFileName: "Reminder-Event",
		background: "false",
	};

	return (
		data && (
			<div className="addCal atcb">
				{JSON.stringify(requiredDataForCalendar)}
			</div>
		)
	);
};

export default MyComponent;
