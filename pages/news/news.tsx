import React from 'react';

const News = ({ data }) => {
	return <div> {data} </div>;
};

export default News;

export async function getStaticProps(context) {
	console.log('Get static props');
	console.log(context.previewData);

	return {
		props: {
			data: context.preview
				? 'List of draft articles'
				: 'List of published articles',
		},
	};
}
