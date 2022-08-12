import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer.tsx';

const About = () => {
	return (
		<>
			<Head>
				<title>About</title>
			</Head>
			<div>
				{' '}
				<h2> About Page </h2>
			</div>
		</>
	);
};

export default About;

// define a function on the component
// the page is the component we add the function to
// the returned function is used to customize the layout
About.getLayout = function PageLayout(page) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
};
