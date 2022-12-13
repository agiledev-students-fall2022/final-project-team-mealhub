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
import useState from "react-usestateref";

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
	const [isSearch, setisSearch, isSearchRef] = useState(false);

//get 

//create a data variable to store the updated values for response.data.docs and responce.data.count
let data = {
	docs: [],
	count: 0,
}

	React.useEffect(() => {
		setisSearch(false);
		axios
			.post(`${process.env.REACT_APP_URL}/explore`, {
				params: {
					page: page,
					data
				},
				
			})
			//
			.then((response) => {

				console.log("response query", response.data)
				setCardData(response.data.docs);
				data.docs = response.data.docs
				setCount(response.data.count);
				data.count = response.data.count
				console.log(response.data.count, response.data.docs)
				if (response.data.count / 5 > page) {
					setPage(page + 1);
				}
				console.log("params", page)
			});
	}, []);

	const loadMore = async function () {
		axios
			.post(`${process.env.REACT_APP_URL}/explore`, {
				params: {
					page: page,
				data
				},
			})
			.then((response) => {
				const joinedData = cardData.concat(response.data.docs);
				console.log(response.data.count, response.data.docs)
				data.docs = response.data.docs
				console.log("Load more data",response.data.docs )
				console.log("params load more ", page)
				console.log("Load more dataaaaa",joinedData)
				setCardData(joinedData);
				setCount(response.data.count);
				data.count = response.data.count
				if (response.data.count / 5 > page) {
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
				setisSearch={setisSearch}
			/>
			{(count != 0 && (
				<h1 className="main-heading pt-5">Available Groups</h1>
			)) ||
				(!cardData && <h1 className="main-heading pt-5">Available Groups</h1>)}
			{(count != 0 && (
				<h3 className="sub-heading pt-1">Total results: {count}</h3>
			)) ||
				(!cardData && (
					<h3 className="sub-heading pt-1">Total results: {count}</h3>
				))}
			<div>
				{!cardData && <Load />}
				<InfiniteScroll
					pageStart={0}
					loadMore={!isSearchRef.current && loadMore}
					hasMore={count / 5 > page}
					loader={!isSearchRef.current && <Load />}
				>
					{cardData &&
						cardData.map((e) => {
							return <Card data={e} key={e._id} />;
						})}
				</InfiniteScroll>
			</div>
			{cardData && count == 0 && (
				<div>
					<h2 className="main-heading2 d-flex justify-content-center pt-5">
						No results :(
					</h2>
					<h3 className="sub-heading2 d-flex justify-content-center  pt-1">
						We couldn't find what you were looking for...
					</h3>
				</div>
			)}
			<Footer />
		</div>
	);
}

export default Explore;
