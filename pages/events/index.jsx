import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EventList = ({ eventList }) => {
	const router = useRouter();
	const [events, setEvents] = useState(eventList);
	const [categoryType, setCategoryType] = useState('sports');

	const fetchNewEvents = async () => {
		const response = await fetch(
			`http://localhost:4000/events?category=${categoryType}`
		);
		const data = await response.json();
		setEvents(data);
		router.push(`events?category=${categoryType}`, undefined, {
			shallow: true,
		});
	};

	const handleChange = (e) => {
		setCategoryType(e.target.value);
	};
	return (
		<div>
			<select
				name='categoryTypes'
				onChange={handleChange}
				value={categoryType}
				style={{
					width: '200px',
					color: 'blue',
					fontSize: '20px',
					marginRight: '30px',
				}}
			>
				<option value='sports'>Sports</option>
				<option value='technology'>Technology</option>
				<option value='food'>Food</option>
			</select>

			<button onClick={() => fetchNewEvents(categoryType)}>
				{' '}
				Fetch selected events
			</button>
			<h1> List of events </h1>
			{events?.map((event) => {
				return (
					<div key={event.id}>
						<h2>
							{' '}
							{event.id} {event.title} {event.date} | {event.category}{' '}
						</h2>
						<p> {event.description} </p>
					</div>
				);
			})}
		</div>
	);
};

export default EventList;

export async function getServerSideProps(context) {
	const { query } = context;
	const { category } = query;
	console.log(category);
	const queryString = category ? `category=${category}` : '';
	const response = await fetch(`http://localhost:4000/events?${queryString}`);
	const data = await response.json();

	return {
		props: {
			eventList: data,
		},
	};
}
