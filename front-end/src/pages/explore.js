import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/card";
import React from "react";
import axios from "axios";
import SearchBarComponent from "../components/searchbar";
import { TailSpin } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroller";

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

function Explore() {
	const [cardData, setCardData] = React.useState(null);
	const [count, setCount] = React.useState(0);
	const [page, setPage] = React.useState(0);

	React.useEffect(() => {
		console.log("called");
		axios
			.get(`${process.env.REACT_APP_URL}/explore`, {
				params: {
					page: page,
				},
			})
			.then((response) => {
				setCardData(response.data.docs);
				setCount(response.data.count);
				if (response.data.count / 10 > page) {
					setPage(page + 1);
				}
			});
	}, []);

	const loadMore = function () {
		console.log("get 10 more");
		axios
			.get(`${process.env.REACT_APP_URL}/explore`, {
				params: {
					page: page,
				},
			})
			.then((response) => {
				const joinedData = cardData.concat(response.data.docs);
				setCardData(joinedData);
				setCount(response.data.count);
				if (response.data.count / 10 > page) {
					setPage(page + 1);
				}
			});
	};

	return (
		<div>
			<NavbarComponent />
			<SearchBarComponent
				setCardData={setCardData}
				setCount={setCount}
				page={page}
				setPage={setPage}
			/>
			<h1 className="main-heading pt-5">Available Groups</h1>
			<h3 className="sub-heading pt-1">Total results: {count}</h3>
			<div>
				{!cardData && <Load />}
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMore}
					hasMore={count / 10 > page}
					loader={<Load />}
				>
					{cardData &&
						cardData.map((e) => {
							if (rand()) {
								e["image"] = "https://picsum.photos/200";
							} else {
								e["image"] = "https://random.imagecdn.app/200/200";
							}
							return <Card data={e} />;
						})}
				</InfiniteScroll>
			</div>
			<Footer />
		</div>
	);
}

export default Explore;
