import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/MyCard";
import React from "react";
import axios from "axios";
import SearchBarComponent from "../components/searchbar";
import { TailSpin } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// mock data
const rand = function () {
	return Math.floor(Math.random() * 2);
};

// loading component
const Load = () => {
	return (
		<div className="loader">
			<TailSpin
				height="100"
				width="100"
				color="#eb6f3f"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

const data={
	"jwt": localStorage.getItem("token")
}




console.log(data);

function Explore() {

	const [cardData, setCardData] = React.useState(null);
	const [count, setCount] = React.useState(0);

	//axios post request to checkuser
	axios.post(`${process.env.REACT_APP_URL}/checkuser`, data, { withCredentials: true })
	.then((res) => {
		console.log("in  my grounds", res.data.user);
		//save the res.data.user
		localStorage.setItem("groupLeader", JSON.stringify(res.data.user));
	}
	)
	.catch((err) => {
		console.log(err);
	});

	console.log("group leader", localStorage.getItem("groupLeader"));

	React.useEffect(() => {
		const groupLeader = localStorage.getItem("groupLeader");
		axios
			.post(`${process.env.REACT_APP_URL}/myGroup`, groupLeader,  { withCredentials: true })
			.then((response) => {
				console.log(response)
				setCardData(response.data);
			})
			.catch((err) => {
				console.log("error in my group", err);
			}
			);
			
	}, []);

	return (
		<div>
			<NavbarComponent />
			<SearchBarComponent setCardData={setCardData} setCount={setCount} />
			<h1 className="main-heading pt-5">My Groups</h1>
			{/* <h3 className="sub-heading pt-1">Total results: {count}</h3> */}
			<div>
				{!cardData && <Load />}
				{cardData &&
					cardData.map((e) => {
						return <Card data={e} key={e._id} />;
					})}
			</div>
			<Footer />
		</div>
	);
}

export default Explore;
