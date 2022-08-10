import React from 'react';
import useSWR from 'swr';

const fetcher = async () => {
	const response = await fetch('http://localhost:4000/dashboard');
	const data = await response.json();
	return data;
};

const DashboardSWR = () => {
	const response = useSWR('dashboard', fetcher);

	if (response.error) return 'An error has occured';
	if (!response.data) return 'Loading...';

	return (
		<div>
			<h1> {JSON.stringify(response.data, null, 2)}</h1>
		</div>
	);
};

export default DashboardSWR;
