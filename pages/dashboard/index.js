import React, { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';

const Dashboard = () => {
	// userSessionLoading
	const [userSessionLoading, setUserSessionLoading] = useState(true);

	// data feching variables
	const [isLoading, setIsLoading] = useState(true);
	const [dashboardData, setDashboardData] = useState(null);

	// get user session
	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (!session) {
	// 			window.location.href = '/api/auth/signin';
	// 		} else {
	// 			setUserSessionLoading(false);
	// 		}
	// 	});
	// }, []);

	useEffect(() => {
		const securePage = async () => {
			const session = await getSession();
			if (!session) {
				signIn();
			} else {
				setUserSessionLoading(false);
			}
		};

		securePage();
	}, []);

	// data fetching effect
	useEffect(() => {
		async function fetchDashboardData() {
			const response = await fetch('http://localhost:4000/dashboard');
			const data = await response.json();

			setDashboardData(data);
			setIsLoading(false);
		}

		fetchDashboardData();
	}, []);

	//loading for data status and or user session
	if (isLoading || userSessionLoading) {
		return <h2> Loading... </h2>;
	}

	return (
		<div>
			<h1> Dashboard </h1>
			<h2> Posts - {dashboardData.posts} </h2>
			<h2> Likes - {dashboardData.likes} </h2>
			<h2> Followers - {dashboardData.followers} </h2>
			<h2> Following - {dashboardData.following} </h2>
		</div>
	);
};

export default Dashboard;
