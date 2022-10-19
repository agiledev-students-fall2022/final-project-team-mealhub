import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/navbar";
import Footer from "./components/footer";
import Card from "./components/card";
import React from "react";
import axios from "axios";
import SearchBarComponent from "./components/searchbar";

// mock data
const rand = function () {
	return Math.floor(Math.random() * 2);
};

console.log(rand());
console.log(rand());
console.log(rand());
console.log(rand());

function App() {
	const [cardData, setCardData] = React.useState(null);

	React.useEffect(() => {
		axios
			.get(`https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`)
			.then((response) => {
				setCardData(response.data);
			});
	}, []);

	return (
		<div>
			<NavbarComponent />
			<SearchBarComponent />
			<h1 className="main-heading pt-5">Suggestions</h1>
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

export default App;
