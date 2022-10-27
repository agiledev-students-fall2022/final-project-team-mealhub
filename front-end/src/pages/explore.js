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

// Mock data to test in development
const data = [
	{
		date: "07/17/2022",
		restaurant: "Runte-Rosenbaum",
		location: "Lishu",
		remaining: 8,
		capacity: 4,
		cuisine: "China",
		dress_code: "Formal-Casual",
		budget: 2,
		name: "Kenneth Pauletto",
	},
	{
		date: "09/13/2022",
		restaurant: "Bernier and Sons",
		location: "Majunying",
		remaining: 2,
		capacity: 4,
		cuisine: "China",
		dress_code: "Casual",
		budget: 3,
		name: "Arel Josey",
	},
	{
		date: "12/05/2021",
		restaurant: "Rodriguez, Denesik and White",
		location: "Longlisuo",
		remaining: 1,
		capacity: 38,
		cuisine: "China",
		dress_code: "Casual",
		budget: 5,
		name: "Alena Chretien",
	},
	{
		date: "10/08/2022",
		restaurant: "Harris, Goyette and Denesik",
		location: "Roshal’",
		remaining: 19,
		capacity: 27,
		cuisine: "Russia",
		dress_code: "Casual",
		budget: 1,
		name: "Alvira Carlisi",
	},
	{
		date: "02/12/2022",
		restaurant: "Lang LLC",
		location: "Akune",
		remaining: 14,
		capacity: 3,
		cuisine: "Japan",
		dress_code: "Casual",
		budget: 5,
		name: "Drew Josipovitz",
	},
	{
		date: "10/20/2021",
		restaurant: "Spinka, Harber and Carter",
		location: "Sagua la Grande",
		remaining: 11,
		capacity: 32,
		cuisine: "Cuba",
		dress_code: "Casual",
		budget: 4,
		name: "Frederich Mizen",
	},
	{
		date: "09/30/2022",
		restaurant: "Sauer, Hane and Lindgren",
		location: "Ajuda",
		remaining: 8,
		capacity: 42,
		cuisine: "Portugal",
		dress_code: "Casual",
		budget: 5,
		name: "Marlyn Giovanazzi",
	},
	{
		date: "04/01/2022",
		restaurant: "Grimes-Berge",
		location: "Voskresenskoye",
		remaining: 12,
		capacity: 35,
		cuisine: "Russia",
		dress_code: "Formal-Casual",
		budget: 3,
		name: "Bianka Scarth",
	},
	{
		date: "04/04/2022",
		restaurant: "Romaguera, Bartoletti and Lind",
		location: "San Cristóbal",
		remaining: 19,
		capacity: 25,
		cuisine: "Dominican Republic",
		dress_code: "Casual",
		budget: 3,
		name: "Wright Rissom",
	},
	{
		date: "11/21/2021",
		restaurant: "Prohaska-Lockman",
		location: "Huadian",
		remaining: 4,
		capacity: 34,
		cuisine: "China",
		dress_code: "Formal-Casual",
		budget: 2,
		name: "Niel McGrudder",
	},
];

function Explore() {
	const [cardData, setCardData] = React.useState(data);

	// React.useEffect(() => {
	// 	axios
	// 		.get(`https://my.api.mockaroo.com/mealhub.json?key=2f898fd0`)
	// 		.then((response) => {
	// 			setCardData(response.data);
	// 		});
	// }, []);

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

export default Explore;
