import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/card";
import React from "react";
import axios from "axios";
import SearchBarComponent from "../components/searchbar";

// mock data
const rand = function () {
	return Math.floor(Math.random() * 2);
};

//my.api.mockaroo.com/mealhub.json?key=533f5110
function MyGroup() {
	const [cardData, setCardData] = React.useState(null);

	React.useEffect(() => {
		axios.get(`${process.env.REACT_APP_URL}/myGroup`).then((response) => {
			setCardData(response.data);
			// console.log(response.data);
		});
	}, []);

	return (
		<div>
			<NavbarComponent />
			<SearchBarComponent setCardData={setCardData} />

			<h1 className="main-heading pt-5">My Groups</h1>
			<div>
				{cardData &&
					cardData.map((e) => {
						if (rand()) {
							e["image"] = "https://picsum.photos/200";
						} else {
							e["image"] = "https://random.imagecdn.app/200/200";
						}

						return <Card data={e} />;
					})}
			</div>
			<Footer />
		</div>
	);
}

export default MyGroup;
